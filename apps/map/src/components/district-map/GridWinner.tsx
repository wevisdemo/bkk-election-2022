
import { AnimatedGIFLoader } from '@pixi/gif';
import { SmoothGraphics as Graphics } from '@pixi/graphics-smooth';
import { Viewport } from 'pixi-viewport';
import * as PIXI from "pixi.js";
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Preset, presetContext } from '../../contexts/preset';
import { District } from '../../models/election';
import DistrictTooltip from '../DistrictTooltip';
import {
  DistrictGridWinnerData, MAX_DISPLAY_RANK, WORLD_HEIGHT, WORLD_WIDTH
} from './MapHelper';

PIXI.Loader.registerPlugin(AnimatedGIFLoader);

const GridWinner: React.FC = () => {
  const preset = useContext(presetContext)! as Preset;
  const parentRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [app, setApp] = useState<PIXI.Application | undefined>()
  const [viewport, setViewport] = useState<Viewport | undefined>()
  const [appLoaded, setAppLoaded] = useState(false)

  // tooltip
  const [tooltips, setTooltips] = useState<{
    show: boolean,
    district: District | undefined,
    left: string | number,
    top: string | number,
    bottom: string | number,
    pointUp: boolean
  }>({
    show: false,
    district: undefined,
    left: "unset",
    top: "unset",
    bottom: "unset",
    pointUp: true,
  })

  if (!preset) return <></>
  const { electionData, candidateMap } = preset

  // data
  const [electionDistrictData, setElectionDistrictData] = useState<DistrictGridWinnerData[]>([]);
  let highestEligiblePopulation: number = 50000;

  const textStyle = new PIXI.TextStyle({
    fontFamily: 'Anuphan',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    fill: '#ffffff',
    stroke: '#000000',
    strokeThickness: 6,
    lineJoin: "round",
    textBaseline: "bottom",
  })

  const handlePointerDownEvent = (e: any, district: District) => {
    if (parentRef.current) {
      const clientHeight = parentRef.current?.clientHeight
      const pointUp: boolean = !(e.data.global.y > clientHeight * .33)
      setTooltips((prev) => ({
        ...prev,
        district: district,
        show: true,
        left: e.data.global.x - 15,
        top: pointUp ? e.data.global.y + 20 : "unset",
        bottom: !pointUp ? clientHeight - e.data.global.y + 10 : "unset",
        pointUp: pointUp
      }))
    }
  }

  const draw = (app: PIXI.Application, viewport: Viewport) => {
    if (electionDistrictData.length > 0) {
      drawRiver(viewport)
      const anim = app.loader.resources.stripe.animation;
      const rectSize = 100;
      const padding = 20;
      electionDistrictData.forEach((data) => {
        const { coordinate, district, highestScoreCandidate } = data
        const x = coordinate.col * rectSize + coordinate.col * padding;
        const y = coordinate.row * rectSize + coordinate.row * padding;

        const graphics = new Graphics();

        if (highestScoreCandidate) {
          graphics.beginFill(+highestScoreCandidate.color.replace("#", "0x"), 1, true);
        }
        graphics.drawRoundedRect(x, y, rectSize, rectSize, 2);
        graphics.endFill();
        graphics.interactive = true;
        graphics.buttonMode = true;
        graphics.on('pointerover', (_) => {
          graphics.tint = 0x666666
          setTooltips((prev) => ({
            ...prev,
            district: district,
            show: true
          }))
        })
        graphics.on('pointerout', (_) => {
          graphics.tint = 0xFFFFFF
          setTooltips((prev) => ({
            ...prev,
            show: false
          }))
        });

        graphics.on('pointerdown', (e) => {
          graphics.tint = 0xFFFFFF
          handlePointerDownEvent(e, district)
        });

        if (typeof district.voting.progress !== "undefined" && district.voting.progress < 100) {
          const scale = (rectSize / 30)
          graphics.beginTextureFill({ alpha: 0.2, texture: anim?.texture, matrix: new PIXI.Matrix(scale, 0, 0, scale, x, y) })
          graphics.drawRect(x, y, rectSize, rectSize,);
          graphics.endFill();
        }
        viewport.addChild(graphics)

        const basicText = new PIXI.Text(district.name, textStyle);
        basicText.x = x + rectSize * .5;
        basicText.y = y + rectSize * .5;
        basicText.anchor.set(0.5);

        viewport.addChild(basicText);
      })
    }
  }

  const drawRiver = (viewport: Viewport) => {
    const graphics = new Graphics();
    graphics.lineStyle(50, 0xFFFFFF, 0.3);
    graphics.moveTo(530, 0);
    graphics.lineTo(530, 170);
    graphics.lineTo(410, 170);
    graphics.lineTo(410, 530);
    graphics.lineTo(530, 530);
    graphics.lineTo(530, 770);
    graphics.lineTo(770, 770);
    graphics.lineTo(770, 650);
    graphics.lineTo(1010, 650);
    graphics.lineTo(1010, 740);
    viewport.addChild(graphics);
  }

  useMemo(() => {
    if (!preset) return;
    // process data for map winner
    const { districts } = electionData;
    // find highest eligible vote
    let highestEligible = districts.reduce((maxResult: District, res: District) => maxResult.voting.eligiblePopulation > res.voting.eligiblePopulation ? maxResult : res)
    if (highestEligible) highestEligiblePopulation = highestEligible.voting.eligiblePopulation;
    let electionDistrictDataSet: DistrictGridWinnerData[] = [];
    districts.forEach((district) => {
      electionDistrictDataSet.push(new DistrictGridWinnerData(district, candidateMap))
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
    app.loader.load((loader, resources) => {
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
        interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
      })

      // add the viewport to the stage
      app.stage.addChild(viewport)
      // activate plugins
      viewport.on("pointermove", (e) => {
        if (parentRef.current) {
          const clientHeight = parentRef.current?.clientHeight
          const pointUp: boolean = !(e.data.global.y > clientHeight * .33)
          setTooltips((prev) => ({
            ...prev,
            left: e.data.global.x - 15,
            top: pointUp ? e.data.global.y + 20 : "unset",
            bottom: !pointUp ? clientHeight - e.data.global.y + 10 : "unset",
            pointUp: pointUp
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
      />
    </div>
  );
}

export default GridWinner