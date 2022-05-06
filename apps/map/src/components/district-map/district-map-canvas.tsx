import React, { ReactComponentElement, useContext, useEffect, useRef } from 'react'
import { presetContext, Preset } from '../../contexts/preset';

import { Candidate, CandidateMap } from '../../models/candidate';
import { ElectionData, District, Result, Voting } from '../../models/election'
import { BKKMapPolygonData, MapPolygon } from './bkk-district-map-polygon'
import { DEFAULT_CANDIDATE_COLOR } from '../../constants/candidate'
import { Visualization } from '../../models/visualization'
type Vector2D = {
  x: number;
  y: number;
}

type Table2D = {
  row: number;
  col: number;
}

interface DistrictMapProps {
  styles: React.CSSProperties,
  type: Visualization
  options: MapCanvasOptions
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
  region: Path2D;

  // rect map
  rectRegion: Path2D;
  center: Vector2D;

  // rationMap
  rectRatioRegion: Path2D;
  rectRatioVector: Vector2D;
  top: Vector2D;

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
      // console.log(this.highestScoreResult.candidateId, " ----", c);
      this.highestScoreCandidate = c[this.highestScoreResult.candidateId];
    }

    const defaultVector = {
      x: -1,
      y: -1
    };
    this.center = defaultVector;
    this.top = defaultVector;
    this.rectRatioVector = defaultVector;
    // generate path
    this.region = new Path2D;
    this.polygonPath();
    this.rectRegion = new Path2D;
    this.rectPath();
    this.rectRatioRegion = new Path2D;
    this.rectRationPath();
  }

  polygonPath() {
    // polygon
    const mapPolygon: MapPolygon | undefined = BKKMapPolygonData.find((value: MapPolygon) => value.name === this.district.name);
    if (mapPolygon)
      this.polygon = mapPolygon.polygon
    this.polygon.forEach((vec: Vector2D, index: number) => {
      if (index === 0)
        this.region.moveTo(vec.x, vec.y)
      else
        this.region.lineTo(vec.x, vec.y)
    })
    this.region.closePath();
  }

  rectPath() {    // rect-path
    let rectSize = 84
    const radius = 4;
    const padding = 20;
    const width = rectSize;
    const height = rectSize;
    let radiusData = { tl: radius, tr: radius, br: radius, bl: radius };

    const x = this.coordinate.col * rectSize + this.coordinate.col * padding;
    const y = this.coordinate.row * rectSize + this.coordinate.row * padding;
    this.center = {
      x: x + rectSize * .5,
      y: y + rectSize * .5
    };
    this.rectRegion.moveTo(
      x + radiusData.tl,
      y);
    this.rectRegion.lineTo(
      x + width - radiusData.tr,
      y);
    this.rectRegion.quadraticCurveTo(
      x + width,
      y,
      x + width,
      y + radiusData.tr);
    this.rectRegion.lineTo(
      x + width,
      y + height - radiusData.br);
    this.rectRegion.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radiusData.br,
      y + height);
    this.rectRegion.lineTo(
      x + radiusData.bl,
      y + height);
    this.rectRegion.quadraticCurveTo(
      x,
      y + height,
      x,
      y + height - radiusData.bl);
    this.rectRegion.lineTo(
      x,
      y + radiusData.tl);
    this.rectRegion.quadraticCurveTo(
      x,
      y,
      x + radiusData.tl,
      y);
    this.rectRegion.closePath();

  }

  rectRationPath() {    // rect-path
    let rectSize = 100
    const radius = 4;
    const padding = 10;

    const marginTop = 50;
    const width = rectSize;
    const height = rectSize;
    let radiusData = { tl: radius, tr: radius, br: radius, bl: radius };

    const rectSizeWithRatio = (rectSize * this.ratio);
    const x = this.coordinate.col * rectSize + rectSize * .5 - rectSizeWithRatio * .5 + this.coordinate.col * padding * .5;
    let y = this.coordinate.row * rectSize + rectSize * .5 - rectSizeWithRatio * .5 + this.coordinate.row * padding * .5;
    y += marginTop;
    this.top = {
      x: x + rectSizeWithRatio * .5,
      y: y
    };

    this.rectRatioVector = {
      x: x,
      y: y,
    }
    this.rectRatioRegion.rect(x, y, rectSizeWithRatio, rectSizeWithRatio);
  }
}

const getDistrictCoordinate = (districtName: string): Table2D => {
  switch (districtName) {
    // case " ": 
    // maxrow = 7
    // maxcol = 11

    case "บางพลัด": return { row: 2, col: 2 };
    case "ห้วยขวาง": return { row: 2, col: 7 };
    case "วังทองหลาง": return { row: 2, col: 8 };
    case "ทวีวัฒนา": return { row: 3, col: 0 };
    case "ลาดกระบัง": return { row: 3, col: 11 };
    case "ดินแดง": return { row: 2, col: 6 };
    case "ตลิ่งชัน": return { row: 3, col: 1 };
    case "ดุสิต": return { row: 2, col: 4 };
    case "สะพานสูง": return { row: 3, col: 10 };
    case "พญาไท": return { row: 1, col: 5 };
    case "บางกอกน้อย": return { row: 3, col: 2 };
    case "ราชเทวี": return { row: 2, col: 5 };
    case "พระนคร": return { row: 3, col: 4 };
    case "ป้อมปราบศัตรูพ่าย": return { row: 3, col: 5 };
    case "ปทุมวัน": return { row: 3, col: 7 };
    case "บางแค": return { row: 4, col: 0 };
    case "สวนหลวง": return { row: 4, col: 10 };
    case "วัฒนา": return { row: 3, col: 8 };
    case "บางกอกใหญ่": return { row: 4, col: 2 };
    case "ภาษีเจริญ": return { row: 4, col: 1 };
    case "สัมพันธวงศ์": return { row: 3, col: 6 };
    case "คลองเตย": return { row: 4, col: 8 };
    case "ธนบุรี": return { row: 5, col: 2 };
    case "คลองสาน": return { row: 5, col: 3 };
    case "ประเวศ": return { row: 5, col: 10 };
    case "บางรัก": return { row: 4, col: 5 };
    case "หนองแขม": return { row: 5, col: 0 };
    case "สาทร": return { row: 4, col: 6 };
    case "ยานนาวา": return { row: 4, col: 7 };
    case "จอมทอง": return { row: 5, col: 1 };
    case "บางคอแหลม": return { row: 5, col: 5 };
    case "พระโขนง": return { row: 4, col: 9 };
    case "ราษฎร์บูรณะ": return { row: 6, col: 3 };
    case "บางบอน": return { row: 6, col: 1 };
    case "บางนา": return { row: 5, col: 9 };
    case "บางขุนเทียน": return { row: 7, col: 1 };
    case "ดอนเมือง": return { row: 0, col: 7 };
    case "หนองจอก": return { row: 1, col: 11 };
    case "สายไหม": return { row: 1, col: 9 };
    case "คลองสามวา": return { row: 1, col: 10 };
    case "หลักสี่": return { row: 0, col: 6 };
    case "บางเขน": return { row: 1, col: 8 };
    case "จตุจักร": return { row: 1, col: 6 };
    case "คันนายาว": return { row: 2, col: 10 };
    case "มีนบุรี": return { row: 2, col: 11 };
    case "ลาดพร้าว": return { row: 1, col: 7 };
    case "บางซื่อ": return { row: 0, col: 5 };
    case "บึงกุ่ม": return { row: 2, col: 9 };
    case "บางกะปิ": return { row: 3, col: 9 };
    case "ทุ่งครุ": return { row: 6, col: 2 };
    default: {
      console.log(districtName)
      return { row: -1, col: -1 }
    }
  }
}

class BkkMapCanvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;

  electionData: ElectionData;
  candidateMap: CandidateMap;
  electionDistrictData: DistrictRect[] = [];

  highestEligiblePopulation: number = 50000;

  type: Visualization

  constructor(w: number, h: number, eData: ElectionData, cData: CandidateMap, type: Visualization) {

    // this.canvas = document.createElement('canvas');
    // this.width = width;
    // this.height = height;

    this.canvas = document.createElement('canvas');
    this.canvas.width = w * devicePixelRatio * 2;
    this.canvas.height = h * devicePixelRatio * 2;
    this.width = w * devicePixelRatio * 2;
    this.height = h * devicePixelRatio * 2;

    this.ctx = this.canvas.getContext('2d')! as CanvasRenderingContext2D;
    this.ctx.scale(devicePixelRatio * 2, devicePixelRatio * 2)


    this.electionData = eData;
    this.candidateMap = cData;

    // console.log(this.candidateMap);

    this.type = type

    // process data for map winner
    if (this.electionData) {
      const { total, districts } = this.electionData;
      console.log(districts, total)

      // find highest eligible vote
      let highestEligible = districts.reduce((maxResult: District, res: District) => maxResult.voting.eligiblePopulation > res.voting.eligiblePopulation ? maxResult : res)
      // console.log(highestEligiblePopulation);
      if (highestEligible) this.highestEligiblePopulation = highestEligible.voting.eligiblePopulation;

      districts.forEach((district) => {
        const { voting } = district
        let ratio = voting.eligiblePopulation / this.highestEligiblePopulation;

        let districtVoteRatio: RectColorWithCandidateRatio[] = []
        let percentageIncrementor = 0
        voting.result.forEach((result, index) => {
          if (index === voting.result.length - 1) {
            districtVoteRatio.push({
              percentage: 100 - percentageIncrementor,
              color: this.getCandidateColor(result.candidateId)
            })
          } else {
            districtVoteRatio.push({
              percentage: Math.floor(result.count / voting.totalVotes * 100),
              color: this.getCandidateColor(result.candidateId)
            })
            percentageIncrementor += result.count / voting.totalVotes * 100
          }

        })

        this.electionDistrictData.push(new DistrictRect(district, cData, ratio, districtVoteRatio))
      })
    }



    // initial setup
    this.ctx.font = "400 16px Anuphan";

    switch (type) {
      case Visualization.GRID_RATIO: this.drawRatioMap(); break;
      case Visualization.GRID_WINNER: this.drawRectMap(); break;
      case Visualization.MAP_WINNER: this.drawPolygonMap(); break;
      default: break;
    }
  }

  getCandidateColor(id: string) {
    let candidate = this.candidateMap[id]
    if (candidate) {
      return candidate.color
    } else {
      return DEFAULT_CANDIDATE_COLOR
    }
  }

  draw() {
    // this.ctx.fillStyle = "red"
    // this.ctx.fillRect(0, 0, this.width, this.height);
    // this.ctx.beginPath();
    const { districts } = this.electionData;

    districts.forEach(({ name: string }, index) => {
      this.ctx.lineWidth = 6;
      this.ctx.strokeStyle = "black";
      this.ctx.rect(index * 84, 0, 84, 84);
      this.ctx.stroke();
    })
  }

  // roundRect(x: number, y: number, width: number, height: number, radius: number, fill: boolean, stroke: boolean) {

  //   let radiusData = { tl: radius, tr: radius, br: radius, bl: radius };
  //   const defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
  //   // for (const side in defaultRadius) {
  //   //   radiusData[side] = radiusData[side] || defaultRadius[side];
  //   // }
  //   this.ctx.beginPath();
  //   this.ctx.moveTo(x + radiusData.tl, y);
  //   this.ctx.lineTo(x + width - radiusData.tr, y);
  //   this.ctx.quadraticCurveTo(x + width, y, x + width, y + radiusData.tr);
  //   this.ctx.lineTo(x + width, y + height - radiusData.br);
  //   this.ctx.quadraticCurveTo(x + width, y + height, x + width - radiusData.br, y + height);
  //   this.ctx.lineTo(x + radiusData.bl, y + height);
  //   this.ctx.quadraticCurveTo(x, y + height, x, y + height - radiusData.bl);
  //   this.ctx.lineTo(x, y + radiusData.tl);
  //   this.ctx.quadraticCurveTo(x, y, x + radiusData.tl, y);
  //   this.ctx.closePath();
  //   if (fill) {
  //     this.ctx.fill();
  //   }
  //   if (stroke) {
  //     this.ctx.stroke();
  //   }

  // }

  drawPolygonMap() {
    this.ctx.scale(4.25, 4.25);
    this.electionDistrictData.forEach((data) => {
      const { highestScoreCandidate, polygon, region } = data
      this.ctx.fillStyle = highestScoreCandidate ? highestScoreCandidate.color : DEFAULT_CANDIDATE_COLOR;
      this.ctx.strokeStyle = "#000000"
      this.ctx.lineWidth = 0.432;
      this.ctx.fill(region);
      this.ctx.stroke(region);
    });

  }

  drawRectMap() {
    if (this.electionDistrictData.length > 0) {
      const rectSize = 84;
      const padding = 10;
      this.ctx.lineWidth = 20;
      this.ctx.strokeStyle = "black";

      // draw rect
      this.electionDistrictData.forEach((data) => {
        const { coordinate, district, highestScoreCandidate, rectRegion } = data
        if (highestScoreCandidate) {
          this.ctx.fillStyle = highestScoreCandidate.color
        }
        this.ctx.fill(rectRegion)
      })

      this.ctx.font = "bolder 18px Anuphan";
      this.ctx.textAlign = "center"
      this.ctx.textBaseline = "middle"
      this.ctx.fillStyle = "white";
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = "black";

      this.electionDistrictData.forEach((data) => {
        const { center, district } = data

        this.ctx.strokeText(district.name, center.x, center.y);
        this.ctx.fillText(district.name, center.x, center.y);

      })

      // draw text
    }
  }

  drawRatioMap() {
    if (this.electionDistrictData.length > 0) {
      this.ctx.scale(1, 1);
      this.electionDistrictData.forEach((data) => {
        const { coordinate, district, highestScoreCandidate, ratio, districtVoteRatio, rectRatioRegion, rectRatioVector } = data
        this.ctx.lineWidth = 6;
        this.ctx.strokeStyle = "black";
        if (highestScoreCandidate) {
          this.ctx.fillStyle = highestScoreCandidate.color
        }
        this.ctx.fillStyle = "purple"
        this.ctx.fill(rectRatioRegion)

        // district vote ratio
        const rectSize = 100;
        const rectSizeWithRatio = (rectSize * ratio);
        let offSetY = 0;

        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "black";
        districtVoteRatio.forEach(({ percentage, color }) => {
          const voteRectHeight = rectSizeWithRatio * percentage / 100
          this.ctx.fillStyle = color;

          this.ctx.fillRect(rectRatioVector.x,
            rectRatioVector.y + offSetY,
            rectSizeWithRatio,
            voteRectHeight);
          this.ctx.strokeRect(rectRatioVector.x,
            rectRatioVector.y + offSetY,
            rectSizeWithRatio,
            voteRectHeight);
          offSetY += voteRectHeight
        })
      })

      this.ctx.font = "bolder 18px Anuphan";
      this.ctx.textAlign = "center"
      this.ctx.textBaseline = "bottom"
      this.ctx.fillStyle = "white";
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = "black";

      this.electionDistrictData.forEach((data) => {
        const { top, district } = data

        this.ctx.strokeText(district.name, top.x, top.y);
        this.ctx.fillText(district.name, top.x, top.y);

      })
    }

  }

  getImage(): HTMLCanvasElement {
    return this.canvas
  }

  hitTest(mouseX: number, mouseY: number): District | undefined {

    switch (this.type) {
      case Visualization.GRID_RATIO:
        for (const data of this.electionDistrictData) {
          if (this.ctx.isPointInPath(data.rectRatioRegion, mouseX, mouseY)) {
            return data.district;
          }
        }
        break;
      case Visualization.GRID_WINNER:
        for (const data of this.electionDistrictData) {
          if (this.ctx.isPointInPath(data.rectRegion, mouseX, mouseY)) {
            return data.district;
          }
        }
        ; break;
      case Visualization.MAP_WINNER:
        for (const data of this.electionDistrictData) {
          if (this.ctx.isPointInPath(data.region, mouseX, mouseY)) {
            return data.district;
          }
        }
        break;
      default: break;
    }
    return undefined;
  }
}

class MapCanvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  mouseX: number = -1;
  mouseY: number = -1;
  width: number = 0;
  height: number = 0;

  // debug for performance
  debug: boolean = true;
  fps: number = 0;
  LAST_FRAME_TIME: number = 0;

  // Bkk Map Drawer
  map: BkkMapCanvas;

  // zoom operation
  scale: number;

  // tooltips
  toolTip: ToolTip;

  // type
  mapType: Visualization;

  constructor(ref: HTMLCanvasElement, options: MapCanvasOptions, data: Preset, type: Visualization) {
    this.mapType = type
    this.canvas = ref

    const defaultOptions = {
      width: 500,
      height: 500,
      autoSize: false,
      debug: false,
    }

    const { width, height, autoSize, debug } = { ...defaultOptions, ...options }
    if (autoSize) {
      const parentDiv = document.getElementById('map-canvas')! as HTMLDivElement
      this.canvas.width = parentDiv.clientWidth * devicePixelRatio * 2;
      this.canvas.height = parentDiv.clientHeight * devicePixelRatio * 2;
    } else {
      this.canvas.width = +width * devicePixelRatio * 2;
      this.canvas.height = +height * devicePixelRatio * 2;
    }

    this.width = this.canvas.width
    this.height = this.canvas.height

    this.scale = 1;

    this.ctx = this.canvas.getContext('2d')! as CanvasRenderingContext2D;

    if (autoSize) {
      const parentDiv = document.getElementById('map-canvas')! as HTMLDivElement
      this.canvas.style.width = parentDiv.clientWidth + "px";
      this.canvas.style.height = parentDiv.clientHeight + "px";
    } else {
      this.canvas.style.width = width + "px";
      this.canvas.style.height = height + "px";
    }
    this.attach();

    // offscreen map
    this.map = new BkkMapCanvas(this.width, this.height, data.electionData, data.candidateMap, this.mapType)

    // tooltip
    this.toolTip = new ToolTip(this.ctx)


    const looper = (TIME: number) => {
      this.fps = 1 / ((performance.now() - this.LAST_FRAME_TIME) / 1000);
      this.LAST_FRAME_TIME = TIME /* remember the time of the rendered frame */

      if (this.canvas) {
        this.draw();
        requestAnimationFrame(looper);
      }
    }
    requestAnimationFrame(looper);
  }

  attach() {
    this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this))
    this.canvas.addEventListener("wheel", this.onWheel.bind(this));
  }

  onWheel(e: WheelEvent) {
    // this.scale = e.deltaY * this.SCROLL_SENSITIVITY
  }

  onMouseMove(e: Event) {
    this.ctx.fillStyle = "red"
    const { offsetX, offsetY } = e as MouseEvent;
    this.mouseX = offsetX * devicePixelRatio * 2;
    this.mouseY = offsetY * devicePixelRatio * 2;

    let district = this.map.hitTest(this.mouseX, this.mouseY);
    if (district) {
      console.log(district.name);

      this.toolTip.isDisplay = true;
      this.toolTip.position = { x: this.mouseX, y: this.mouseY }
    } else {
      this.toolTip.isDisplay = false;
    }
  }

  draw() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);

      this.ctx.scale(this.scale, this.scale);

      this.ctx.lineCap = "round";
      this.ctx.lineJoin = "round";
      this.ctx.strokeStyle = "black";
      this.ctx.lineWidth = 1;
      // this.background(0, 255, 0);

      this.ctx.beginPath();
      this.ctx.lineWidth = 6;
      this.ctx.strokeStyle = "red";
      this.ctx.rect(this.mouseX, this.mouseY, 290, 140);
      this.ctx.stroke();

      if (this.debug) {
        this.ctx.fillStyle = "red"
        this.ctx.font = '48px serif';
        this.ctx.fillText(`${Math.floor(this.fps)}: fps`, 10, 50);
      }

      if (this.map) {
        this.ctx.drawImage(this.map.getImage(), 0, 0);
      }

      if (this.toolTip) {
        this.toolTip.draw();
      }

    }

  }

  background(r: number | string, g?: number, b?: number, a?: number): void {
    if (typeof r === "string") {
      this.ctx!.fillStyle = r;
    } else if (a) {
      this.ctx!.fillStyle = `rgba(${r},${g},${b},${a})`;
    } else this.ctx!.fillStyle = `rgba(${r},${g},${b})`;
    this.ctx!.fillRect(0, 0, this.width, this.height);
  }

}


const DistrictMap: React.FunctionComponent<DistrictMapProps> = ({ styles, type, options }: DistrictMapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let mapCanvas: MapCanvas;

  const preset = useContext(presetContext)! as Preset;

  useEffect(() => {
    if (!canvasRef.current)
      return;

    if (!mapCanvas) {
      mapCanvas = new MapCanvas(canvasRef.current, options, preset, type);
      // requestAnimationFrame(() => mapCanvas.draw())
    }
  }, [canvasRef, options])

  const { autoSize } = options

  return (
    <div id="map-canvas" style={autoSize ? { width: "100%", height: "100%", position: "relative", ...styles } : { ...styles }}>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default DistrictMap