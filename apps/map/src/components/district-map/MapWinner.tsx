
import { AnimatedGIFLoader } from '@pixi/gif';
import { SmoothGraphics as Graphics } from '@pixi/graphics-smooth';
import { Viewport } from 'pixi-viewport';
import * as PIXI from "pixi.js";
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_CANDIDATE_COLOR } from '../../constants/candidate';
import { Preset, presetContext } from '../../contexts/preset';
import { District } from '../../models/election';
import DistrictTooltip from '../DistrictTooltip';
import { BKKMapPolygonData, MapPolygon } from './MapPolygonData';
import {
  CLICK_TIMEOUT, DistrictMapWinnerData, MapProps, MAX_DISPLAY_RANK, WORLD_HEIGHT, WORLD_WIDTH
} from './MapHelper';

PIXI.Loader.registerPlugin(AnimatedGIFLoader);

const MapWinner: React.FC<MapProps> = ({ onDistrictClick }: MapProps) => {
  const preset = useContext(presetContext)! as Preset;
  const parentRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [app, setApp] = useState<PIXI.Application | undefined>()
  const [viewport, setViewport] = useState<Viewport | undefined>()
  const [appLoaded, setAppLoaded] = useState(false)
  const pointerDownTime = useRef<number>(0)

  // tooltip
  const [tooltips, setTooltips] = useState<{
    show: boolean,
    district: District | undefined,
    left: string | number,
    top: string | number,
    bottom: string | number,
    pointUp: boolean,
    anchorRight: boolean,
  }>({
    show: false,
    district: undefined,
    left: "unset",
    top: "unset",
    bottom: "unset",
    pointUp: true,
    anchorRight: false,
  })

  if (!preset) return <></>

  const { electionData, candidateMap } = preset
  const [electionDistrictData, setElectionDistrictData] = useState<DistrictMapWinnerData[]>([]);

  const registerOnclick = (graphics: Graphics, onClick: () => void) => {
    graphics.on('pointerdown', (_) => { pointerDownTime.current = Date.now() });
    graphics.on('pointerup', (_) => {
      if (Date.now() - pointerDownTime.current < CLICK_TIMEOUT) onClick();
    });
  }

  const draw = (app: PIXI.Application, viewport: Viewport) => {
    const anim = app.loader.resources.stripe.animation;
    if (anim) {
      electionDistrictData.forEach((data) => {
        const { highestScoreCandidate, district } = data
        const mapPolygon: MapPolygon | undefined = BKKMapPolygonData.find((value: MapPolygon) => value.name === district.name);

        const graphics = new Graphics();
        graphics.lineStyle({
          width: 1,
          color: 0x000000,
          join: PIXI.LINE_JOIN.ROUND
        });
        graphics.beginFill(
          highestScoreCandidate ? +highestScoreCandidate.color.replace("#", "0x") : +DEFAULT_CANDIDATE_COLOR.replace("#", "0x"), 1, true);
        graphics.drawPolygon(mapPolygon?.polygon || []);
        graphics.scale.x = 7
        graphics.scale.y = 7;
        graphics.endFill();

        graphics.interactive = true;
        graphics.buttonMode = true;
        graphics.cacheAsBitmap = true;
        graphics.cacheAsBitmapResolution = 43;

        registerOnclick(graphics, () => onDistrictClick?.(district));
        graphics.on('pointerover', (e) => {
          graphics.tint = 0x666666
          setTooltips((prev) => ({
            ...prev,
            district: district,
            show: true,
          }))
        })

        graphics.on('pointerout', (_) => {
          graphics.tint = 0xFFFFFF
          setTooltips((prev) => ({
            ...prev,
            show: false
          }))
        });

        viewport.addChild(graphics)
      });

      const { total } = electionData
      if (typeof total.progress !== "undefined" && total.progress < 100) {
        const tileStripe = new PIXI.TilingSprite(anim?.texture, viewport.worldWidth, viewport.worldHeight)
        tileStripe.x = 0;
        tileStripe.y = 0;
        tileStripe.alpha = .2
        tileStripe.blendMode = PIXI.BLEND_MODES.DST_OUT
        viewport.addChild(tileStripe)
      }
    }
  }

  useMemo(() => {
    if (!preset) return;
    // process data for map winner
    const { districts } = electionData;
    let electionDistrictDataSet: DistrictMapWinnerData[] = [];
    districts.forEach((district) => {
      electionDistrictDataSet.push(new DistrictMapWinnerData(district, candidateMap))
    })
    setElectionDistrictData(electionDistrictDataSet)
  }, [preset])


  useEffect(() => {
    if (!ref.current) return;
    // On first render create our application
    const app = new PIXI.Application({
      width: ref.current.parentElement?.clientWidth || window.innerWidth,
      height: ref.current.parentElement?.clientHeight || window.innerWidth,
      backgroundColor: 0x000000,
      antialias: true,
      resolution: 2,
      autoDensity: true
    });

    app.loader.add('stripe', '/map/images/strip-black.gif');
    app.loader.load((_, resources) => {
      const anim = resources.stripe.animation;
      if (anim) {
        anim.x = -anim.width;
        anim.y = -anim.height;
        app.stage.addChild(anim);
      }

      const viewport = new Viewport({
        screenWidth: ref.current?.clientWidth,
        screenHeight: ref.current?.clientHeight,
        worldWidth: WORLD_WIDTH,
        worldHeight: WORLD_HEIGHT,
        passiveWheel: false,
        stopPropagation: true,
        interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
      })

      // add the viewport to the stage
      app.stage.addChild(viewport)
      // activate plugins
      viewport.on("pointermove", (e) => {
        if (parentRef.current) {
          const { clientWidth, clientHeight } = parentRef.current
          const pointUp: boolean = !(e.data.global.y > clientHeight * .33)
          setTooltips((prev) => ({
            ...prev,
            left: e.data.global.x - 15,
            top: pointUp ? e.data.global.y + 20 : "unset",
            bottom: !pointUp ? clientHeight - e.data.global.y + 10 : "unset",
            pointUp: pointUp,
            anchorRight: e.data.global.x > (clientWidth * .66)
          }))
        }
      })

      viewport.on('pointerdown', (e) => {
        if (e.target.cursor !== "pointer") {
          setTooltips((prev) => ({
            ...prev,
            show: false,
          }))
        }
      })

      viewport
        .drag()
        .pinch()
        .wheel()

      viewport.clampZoom({
        minWidth: 300,                 // minimum width
        minHeight: 300,                // minimum height
        maxWidth: 2000,                 // maximum width
        maxHeight: 2000,                // maximum height
      })

      viewport.fit()
      viewport.moveCenter(WORLD_WIDTH / 2, WORLD_HEIGHT / 2)

      setApp(app)
      setViewport(viewport)
      setAppLoaded(true)
    });

    ref.current?.appendChild(app.view);
    app.start();

    return () => {
      // On unload completely destroy the application and all of it's children
      app.destroy(true);
    };
  }, []);

  useEffect(() => {
    if (app && viewport && appLoaded) {
      viewport.removeChildren()
      draw(app, viewport);
      setTooltips((prev) => ({
        ...prev,
        show: false
      }))
      viewport.fit()
      viewport.moveCenter(WORLD_WIDTH / 2, WORLD_HEIGHT / 2)
    }
  }, [appLoaded, electionDistrictData])

  return (
    <div className='relative h-full' class='overflow-hidden' ref={parentRef} >
      <div className='w-full h-full' ref={ref} />
      <DistrictTooltip
        show={tooltips.show}
        district={tooltips.district}
        style={{ left: tooltips.left, top: tooltips.top, bottom: tooltips.bottom }}
        pointUp={tooltips.pointUp}
        topCandidateDisplay={MAX_DISPLAY_RANK}
        anchorRight={tooltips.anchorRight}
      />
    </div>
  );
}

export default MapWinner