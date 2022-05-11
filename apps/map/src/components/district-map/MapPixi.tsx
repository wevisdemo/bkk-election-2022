import { Viewport } from 'pixi-viewport';
import * as PIXI from "pixi.js";
import { InteractionEvent } from 'pixi.js';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_CANDIDATE_COLOR } from '../../constants/candidate';
import { Preset, presetContext } from '../../contexts/preset';
import { Candidate, CandidateMap } from '../../models/candidate';
import { District, Result } from '../../models/election';
import { Visualization } from '../../models/visualization';
import DistrictTooltip from '../DistrictTooltip';
import { BKKMapPolygonData, MapPolygon } from './bkk-district-map-polygon';
import { getDistrictCoordinate, Table2D, Vector2D } from './helper';

const WORLD_WIDTH = 1450
const WORLD_HEIGHT = 1000;

interface DistrictMapProps {
  styles?: React.CSSProperties,
  type: Visualization
  options?: MapCanvasOptions
}

interface MapCanvasOptions {
  width?: number | string,
  height?: number | string,
  autoSize?: boolean
  debug?: boolean
}

interface RectColorWithCandidateRatio {
  percentage: number,
  color: string,
}

class ToolTip {

  ctx: CanvasRenderingContext2D;

  private _isDisplay: boolean
  private _districtData: District | undefined
  private _position: Vector2D;

  constructor(c: CanvasRenderingContext2D) {
    this.ctx = c;
    this._isDisplay = false
    this._position = { x: -1, y: -1 }
  }

  get isDisPlay(): boolean {
    return this._isDisplay
  }

  set isDisplay(value: boolean) {
    this._isDisplay = value
  }

  set districtData(value: District) {
    if (!this._districtData)
      this._districtData = value
    else if (value.name !== this._districtData.name) {
      this._districtData = value
    }
  }

  set position(value: Vector2D) {
    this._position = value
  }

  draw() {
    // console.log(this._position)
    if (this._isDisplay) {
      this.ctx.beginPath();
      this.ctx.fillStyle = "purple"
      this.ctx.rect(this._position.x, this._position.y, 200, 200)
      this.ctx.fill()
    }
  }
}


class DistrictRect {
  coordinate: Table2D;
  district: District;
  highestScoreCandidate?: Candidate;
  ratio: number;

  highestScoreResult?: Result;
  districtVoteRatio: RectColorWithCandidateRatio[] = [];

  // polygon
  polygon: Vector2D[] = [];

  // rect map
  rectSize: number = 100;
  constructor(d: District, c: CandidateMap, r: number, dV: RectColorWithCandidateRatio[]) {
    this.coordinate = getDistrictCoordinate(d.name)
    this.district = d;
    this.ratio = r;
    this.districtVoteRatio = dV

    if (this.district) {
      const { voting } = this.district
      const { result } = voting

      this.highestScoreResult = result.reduce((maxResult: Result, res: Result) => maxResult.count > res.count ? maxResult : res)
    }
    if (this.highestScoreResult && c) {
      this.highestScoreCandidate = c[this.highestScoreResult.candidateId];
    }

  }
}

const MapPixi: React.FC<DistrictMapProps> = ({ styles, type, options }: DistrictMapProps) => {
  const preset = useContext(presetContext)! as Preset;
  const parentRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

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
  const [electionDistrictData, setElectionDistrictData] = useState<DistrictRect[]>([]);
  let highestEligiblePopulation: number = 50000;

  const getCandidateColor = (id: string) => {
    let candidate = candidateMap[id]
    if (candidate) {
      return candidate.color
    } else {
      return DEFAULT_CANDIDATE_COLOR
    }
  }

  const drawPolygonMap = (viewport: Viewport) => {

    electionDistrictData.forEach((data) => {
      const { highestScoreCandidate, district } = data
      const mapPolygon: MapPolygon | undefined = BKKMapPolygonData.find((value: MapPolygon) => {
        if (district.name === "ป้อมปราบฯ")
          return value.name === "ป้อมปราบศัตรูพ่าย"
        else
          return value.name === district.name
      });

      const graphics = new PIXI.Graphics();
      graphics.lineStyle(1, 0x000000, 1);
      graphics.beginFill(highestScoreCandidate ? +highestScoreCandidate.color.replace("#", "0x") : +DEFAULT_CANDIDATE_COLOR.replace("#", "0x"));
      graphics.drawPolygon(mapPolygon?.polygon || []);
      graphics.scale.x = 7
      graphics.scale.y = 7;
      graphics.endFill();

      graphics.interactive = true;
      graphics.on('pointerover', (event) => {
        graphics.tint = 0x666666
        setTooltips((prev) => ({
          ...prev,
          district: district,
          show: true
        }))
      })
      graphics.on('pointerout', (event) => {
        graphics.tint = 0xFFFFFF
        setTooltips((prev) => ({
          ...prev,
          show: false
        }))
      });

      viewport.addChild(graphics)
    });

  }

  const drawRectMap = (viewport: Viewport) => {
    if (electionDistrictData.length > 0) {
      drawRiver(viewport)
      // const width = app.screen.width;
      // const height = app.screen.height;

      const rectSize = 100;
      const padding = 20;
      electionDistrictData.forEach((data) => {
        const { coordinate, district, highestScoreCandidate } = data
        const x = coordinate.col * rectSize + coordinate.col * padding;
        const y = coordinate.row * rectSize + coordinate.row * padding;

        const graphics = new PIXI.Graphics();

        if (highestScoreCandidate) {
          graphics.beginFill(+highestScoreCandidate.color.replace("#", "0x"));

        }

        graphics.drawRoundedRect(x, y, rectSize, rectSize, 16);
        graphics.endFill();
        graphics.interactive = true;
        // graphics.buttonMode = true;
        graphics.on('pointerover', (event) => {
          graphics.tint = 0x666666
          setTooltips((prev) => ({
            ...prev,
            district: district,
            show: true
          }))
        })
        graphics.on('pointerout', (event) => {
          graphics.tint = 0xFFFFFF
          setTooltips((prev) => ({
            ...prev,
            show: false
          }))
        });

        viewport.addChild(graphics)

        // // draw rect
        const style = new PIXI.TextStyle({
          fontFamily: 'Anuphan, ui-serif',
          fontSize: 16,
          fontStyle: 'normal',
          fontWeight: '900',
          fill: ['#ffffff'], // gradient
          stroke: '#000000',
          strokeThickness: 2
        })

        const basicText = new PIXI.Text(district.name, style);
        // basicText.tint = 0xFFFFFF
        basicText.x = x + rectSize * .5;
        basicText.y = y + rectSize * .5;
        basicText.anchor.set(0.5);

        viewport.addChild(basicText);
      })
    }
  }

  const drawRatioMap = (viewport: Viewport) => {
    if (electionDistrictData.length > 0) {
      drawRiver(viewport)
      // ctx.scale(0.7, 0.7);
      const rectSize = 100
      const padding = 20;
      const marginTop = 23;

      electionDistrictData.forEach((data) => {
        const { coordinate, district, highestScoreCandidate, ratio, districtVoteRatio, } = data

        const rectSizeWithRatio = Math.sqrt(rectSize * rectSize * ratio);
        const x = coordinate.col * rectSize + rectSize * .5 - rectSizeWithRatio * .5 + coordinate.col * padding;
        let y = coordinate.row * rectSize + rectSize * .5 - rectSizeWithRatio * .5 + coordinate.row * padding;
        y += marginTop;

        const graphics = new PIXI.Graphics();

        if (highestScoreCandidate) {
          // graphics.beginFill(+highestScoreCandidate.color.replace("#", "0x"), 0.25);
        }
        graphics.drawRect(x, y, rectSizeWithRatio, rectSizeWithRatio);
        // graphics.endFill();
        graphics.interactive = true;
        graphics.hitArea = new PIXI.Rectangle(x, y, rectSizeWithRatio, rectSizeWithRatio);
        graphics.buttonMode = true;
        graphics.on('pointerover', (event) => {
          graphics.tint = 0x666666
          setTooltips((prev) => ({
            ...prev,
            district: district,
            show: true
          }))
        })
        graphics.on('pointerout', (event) => {
          graphics.tint = 0xFFFFFF
          setTooltips((prev) => ({
            ...prev,
            show: false
          }))
        });

        let offSetY = 0;
        districtVoteRatio.forEach(({ percentage, color }) => {
          const voteRectHeight = rectSizeWithRatio * percentage / 100
          graphics.lineStyle(1, 0x000000, 1);
          graphics.beginFill(+color.replace("#", "0x"));
          graphics.drawRect(x,
            y + offSetY,
            rectSizeWithRatio,
            voteRectHeight);
          graphics.endFill();
          offSetY += voteRectHeight
        })

        viewport.addChild(graphics)

        const style = new PIXI.TextStyle({
          fontFamily: 'Anuphan, ui-serif',
          fontSize: 16,
          fontStyle: 'normal',
          fontWeight: 'bold',
          fill: ['#ffffff'], // gradient
          stroke: '#000000',
          strokeThickness: 4
        })

        const basicText = new PIXI.Text(district.name, style);
        // basicText.tint = 0xFFFFFF
        basicText.x = x + rectSizeWithRatio * .5;
        basicText.y = y - 10;
        basicText.anchor.set(0.5);

        viewport.addChild(basicText);
      })
    }
  }

  const drawRiver = (viewport: Viewport) => {
    const graphics = new PIXI.Graphics();
    graphics.lineStyle(66, 0xFFFFFF, 0.3);
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
    let electionDistrictDataSet: DistrictRect[] = [];
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
      electionDistrictDataSet.push(new DistrictRect(district, candidateMap, ratio, districtVoteRatio))
    })

    setElectionDistrictData(electionDistrictDataSet)
  }, [preset])


  useEffect(() => {
    if (!ref.current) return;
    // On first render create our application
    const app = new PIXI.Application({
      width: ref.current.parentElement?.clientWidth || window.innerWidth,
      height: ref.current.parentElement?.clientHeight || 500,
      backgroundColor: 0x000000,
      antialias: true
    });

    // Add app to DOM

    ref.current?.appendChild(app.view);
    // Start the MapPixiJS app
    app.start();
    const viewport = new Viewport({
      worldWidth: WORLD_WIDTH,
      worldHeight: WORLD_HEIGHT,
      interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    })

    // add the viewport to the stage
    app.stage.addChild(viewport)
    viewport.interactive = true
    // activate plugins
    viewport.on("pointermove", (e) => {
      if (parentRef.current) {
        const clientHeight = parentRef.current?.clientHeight
        const pointUp: boolean = !(e.data.global.y > clientHeight * .25)
        setTooltips((prev) => ({
          ...prev,
          left: e.data.global.x - 15,
          top: pointUp ? e.data.global.y + 20 : "unset",
          bottom: !pointUp ? clientHeight - e.data.global.y + 10 : "unset",
          pointUp: pointUp
        }))
      }
    })
    viewport
      .drag()
      .pinch()
      .wheel()

    viewport.clampZoom({
      minWidth: 600,                 // minimum width
      minHeight: 600,                // minimum height
      maxWidth: 4000,                 // maximum width
      maxHeight: 4000,                // maximum height

    })

    switch (type) {
      case Visualization.GRID_RATIO: drawRatioMap(viewport); break;
      case Visualization.GRID_WINNER: drawRectMap(viewport); break;
      case Visualization.MAP_WINNER: drawPolygonMap(viewport); break;
      default: break;
    }

    viewport.zoom(WORLD_WIDTH)

    // border(viewport)
    // function border(viewport: Viewport) {
    //   const line = viewport.addChild(new PIXI.Graphics())
    //   line.lineStyle(10, 0xff0000).drawRect(0, 0, viewport.worldWidth, viewport.worldHeight)
    // }

    return () => {
      // On unload completely destroy the application and all of it's children
      app.destroy(true);
    };
  }, [ref, electionDistrictData, type]);

  return (
    <div className='relative' class='overflow-hidden' ref={parentRef} >
      <div ref={ref} />
      <DistrictTooltip
        show={tooltips.show}
        district={tooltips.district}
        style={{ left: tooltips.left, top: tooltips.top, bottom: tooltips.bottom }}
        pointUp={tooltips.pointUp}
      />
    </div>
  );
}

export default MapPixi