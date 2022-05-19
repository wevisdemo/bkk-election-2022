
import { AnimatedGIFLoader } from '@pixi/gif';
import { SmoothGraphics as Graphics } from '@pixi/graphics-smooth';
import { Viewport } from 'pixi-viewport';
import * as PIXI from "pixi.js";
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_CANDIDATE_COLOR } from '../../constants/candidate';
import { Preset, presetContext } from '../../contexts/preset';
import { District } from '../../models/election';
import DistrictTooltip from '../DistrictTooltip';
import { CLICK_TIMEOUT, MapProps, DistrictGridRatioData, MAX_DISPLAY_RANK, RectColorWithCandidateRatio, WORLD_HEIGHT, WORLD_WIDTH } from './MapHelper';

PIXI.Loader.registerPlugin(AnimatedGIFLoader);

const GridRatio: React.FC<MapProps> = ({ onDistrictClick }: MapProps) => {
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

  // data
  const [electionDistrictData, setElectionDistrictData] = useState<DistrictGridRatioData[]>([]);
  let highestEligiblePopulation: number = 50000;

  const getCandidateColor = (id: string) => {
    let candidate = candidateMap[id]
    if (candidate) {
      return candidate.color
    } else {
      return DEFAULT_CANDIDATE_COLOR
    }
  }

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

  const registerOnclick = (graphics: Graphics, onClick: () => void) => {
    graphics.on('pointerdown', (_) => { pointerDownTime.current = Date.now() });
    graphics.on('pointerup', (_) => {
      if (Date.now() - pointerDownTime.current < CLICK_TIMEOUT) onClick();
    });
  }

  const draw = (app: PIXI.Application, viewport: Viewport) => {
    if (electionDistrictData.length > 0) {
      drawRiver(viewport)
      const anim = app.loader.resources.stripe.animation;
      // ctx.scale(0.7, 0.7);
      const rectSize = 100
      const padding = 20;
      const marginTop = 23;

      electionDistrictData.forEach((data) => {
        const { coordinate, district, ratio, districtCandidateVoteRatio } = data
        const rectSizeWithRatio = Math.sqrt(rectSize * rectSize * ratio);
        const x = coordinate.col * rectSize + rectSize * .5 - rectSizeWithRatio * .5 + coordinate.col * padding;
        let y = coordinate.row * rectSize + rectSize * .5 - rectSizeWithRatio * .5 + coordinate.row * padding;
        y += marginTop;

        const graphics = new Graphics();
        graphics.beginFill(0x444444);
        graphics.drawRect(x, y, rectSizeWithRatio, rectSizeWithRatio);
        graphics.endFill();
        graphics.interactive = true;
        graphics.buttonMode = true;

        registerOnclick(graphics, () => onDistrictClick?.(district));
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

        let offSetY = 0;
        districtCandidateVoteRatio.forEach(({ percentage, color }, index) => {
          if (index > MAX_DISPLAY_RANK - 1) return
          const voteRectHeight = rectSizeWithRatio * percentage / 100
          graphics.lineStyle(1, 0x000000, 1);
          graphics.beginFill(+color.replace("#", "0x"), 1, true);
          graphics.drawRect(x,
            y + offSetY,
            rectSizeWithRatio,
            voteRectHeight);
          graphics.endFill();
          offSetY += voteRectHeight
        })

        if (typeof district.voting.progress !== "undefined" && district.voting.progress < 100) {
          const bound = graphics.getBounds()
          graphics.beginTextureFill({ alpha: 0.2, texture: anim?.texture, matrix: new PIXI.Matrix(bound.width / 30, 0, 0, bound.height / 30, bound.x, bound.y) })
          graphics.drawRect(x, y, rectSizeWithRatio, rectSizeWithRatio);
          graphics.endFill();
        }

        viewport.addChild(graphics)

        const basicText = new PIXI.Text(district.name, textStyle);
        // basicText.tint = 0xFFFFFF
        basicText.x = x + rectSizeWithRatio * .5;
        basicText.y = y - 10;
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
    let electionDistrictDataSet: DistrictGridRatioData[] = [];
    districts.forEach((district) => {
      const { voting } = district
      let ratio = voting.eligiblePopulation / highestEligiblePopulation;
      let districtVoteRatio: RectColorWithCandidateRatio[] = []
      let percentageIncrementor = 0
      voting.result.forEach((result, index) => {
        if (index === voting.result.length - 1) {
          districtVoteRatio.push({
            percentage: 100 - percentageIncrementor,
            color: getCandidateColor(result.candidateId)
          })
        } else {
          districtVoteRatio.push({
            percentage: Math.floor(result.count / voting.totalVotes * 100),
            color: getCandidateColor(result.candidateId)
          })
          percentageIncrementor += result.count / voting.totalVotes * 100
        }
      })
      electionDistrictDataSet.push(new DistrictGridRatioData(district, candidateMap, ratio, districtVoteRatio))
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
        passiveWheel: false,
        stopPropagation: true,
        interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
      })

      // add the viewport to the stage
      app.stage.addChild(viewport)
      viewport.on("pointermove", (e) => {
        if (parentRef.current) {
          const { clientHeight, clientWidth } = parentRef.current
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

export default GridRatio