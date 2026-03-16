import { Tool } from "@/component/Canvas";
import { getExistingShapes } from "./http";

type Shape = {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type : "pencil";
    startX : number;
    startY : number;
    x : number;
    y : number;
} | {
    type : "pen";
    points : {x : number, y : number}[]
}



export class Game {
    private canvas : HTMLCanvasElement;
    private ctx : CanvasRenderingContext2D
    private existingShapes : Shape[]
    private roomId : string;
    private socket : WebSocket
    private clicked : boolean
    private startX = 0
    private startY = 0
    private selectedTool : Tool = "Circle"
    private penPoints : {x : number, y : number}[] = []
    private zoom = 1;
    private offsetX = 0;
    private offsetY = 0;
    
    constructor(canvas : HTMLCanvasElement, roomId : string, socket : WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")! //todo = why add "!" this here
        this.existingShapes = []
        this.roomId = roomId
        this.clicked = false
        this.init()        
        this.socket = socket
        this.initHandlers()
        this.initMouseHandlers()
        
       
        
    }

    destroy() {
          this.canvas.removeEventListener("mousedown", this.mouseDownHandler)

            this.canvas.removeEventListener("mouseup", this.mouseUpHandler)

        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler)
                
    }

    setTool(tool: "Circle" | "Pencil" | "Rect" | "Pen" | "Pan")  {
        this.selectedTool = tool 
    }

    async init () {
        console.log("this room id" + this.roomId)
        this.existingShapes = await getExistingShapes(this.roomId);
        console.log("existring", this.existingShapes)
        this.clearCanvas()
    }

    initHandlers() {
        this.socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message.type == "chat") {
            const parsedShape = JSON.parse(message.message)
            this.existingShapes.push(parsedShape.shape)
            this.clearCanvas();
        }
    }
    }

    getMousePos(e : MouseEvent) {
        const rect = this.canvas.getBoundingClientRect()

        const x = (e.clientX - rect.left - this.offsetX) / this.zoom
        const y = (e.clientY - rect.top - this.offsetY) / this.zoom

        return { x,y }
    }

    handelWheel = (e : WheelEvent) => {
        e.preventDefault()

        const zoomAmount = -e.deltaY * 0.001

        this.zoom += zoomAmount

        this.zoom = Math.min(Math.max(0.2, this.zoom), 5)

        this.clearCanvas()
    }

    clearCanvas(preview? : () => void) {      
        
       
         this.ctx.save()

         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

         this.ctx.translate(this.offsetX, this.offsetY)
         
         this.ctx.scale(this.zoom, this.zoom)
          
         this.ctx.fillStyle = "rgba(0, 0, 0)"
         this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.existingShapes.map((shape) => {
             if (shape.type === "rect") {
                 this.ctx.strokeStyle = "rgba(255, 255, 255)"
                 this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === "circle") {
                 this.ctx.beginPath()
                 this.ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2)
                 this.ctx.strokeStyle = "rgba(255, 255, 255)"
                 this.ctx.stroke()
            } else if (shape.type === "pencil") {
                this.ctx.beginPath()                
                this.ctx.moveTo(shape.x, shape.y)
                this.ctx.lineTo(shape.startX, shape.startY)
                this.ctx.strokeStyle = "rgba(255, 255, 255)"
                this.ctx.stroke()
            } else if (shape.type === "pen") {
                this.ctx.beginPath()
                for (let i = 0; i < shape.points.length-1; i++) {
                    const p1 = shape.points[i]
                    const p2 = shape.points[i+1]

                    this.ctx.moveTo(p1.x, p1.y)
                    this.ctx.lineTo(p2.x, p2.y)                    
                }
                this.ctx.strokeStyle = "rgba(255, 255, 255)"
                this.ctx.stroke()
            }
    })

    if(preview) {
        preview()
    }

    this.ctx.restore()
    
    }

    mouseDownHandler = (e) => {
        const pos = this.getMousePos(e)
        
         this.clicked = true
         this.startX = pos.x
         this.startY = pos.y

         if(this.selectedTool === "Pen") {
            this.penPoints = [{x : pos.x, y: pos.y}]
            
         }

         

    }

    mouseUpHandler = (e) => {
        this.clicked = false
        
        const pos = this.getMousePos(e)

        const x = pos.x
        const y = pos.y

        const width = x - this.startX;
        const height = y - this.startY;
       
        
        const selectedTool = this.selectedTool

        let shape : Shape | null = null
        
        if(selectedTool === "Rect") {
            if(height === 0 && width ===0) return
        shape = {
            type: "rect",
            x: this.startX,
            y: this.startY,
            height,
            width
        }} else if (selectedTool === "Circle") {
            const radius = Math.sqrt(width * width + height * height) / 2
            if(radius === 0) return            
            shape={
                type : "circle",
                centerX : this.startX,
                centerY : this.startY,
                radius 
            }
        } else if (selectedTool === "Pencil") {
            if (this.startX === x && this.startY === y) return
            shape={
                type : "pencil",
                startX : this.startX,
                startY : this.startY,
                x,
                y
            }

            

        } else if (selectedTool === "Pen") {
            if(this.penPoints.length < 2) return
            shape={
                type : "pen",
                points : this.penPoints
            }
            console.log("code came"+ shape)
        }

        console.log("mouse up")


        if(!shape) return
        this.existingShapes.push(shape);
        console.log(this.existingShapes)

        this.socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }),
            roomId : Number(this.roomId)
        }))

    }

    drawPreviewShape = (x : number, y : number, width : number, height : number)  => {
        this.ctx.strokeStyle = "rgba(255, 255, 255)"
        const selectedTool = this.selectedTool
            if(selectedTool === "Rect") {
            this.ctx.strokeRect(this.startX, this.startY, width, height);           
            } else if (selectedTool === "Circle") {
                const radius = Math.sqrt(width * width + height * height) / 2
                this.ctx.beginPath();
                this.ctx.arc(this.startX, this.startY, radius, 0, Math.PI * 2)
                this.ctx.strokeStyle = "rgba(255, 255, 255)"
                this.ctx.stroke()                
            } else if (selectedTool === "Pencil") {                
                this.ctx.beginPath()
                this.ctx.moveTo(this.startX, this.startY)
                this.ctx.lineTo(x, y)
                this.ctx.stroke()               
                
            } else if (selectedTool === "Pen") {
                this.penPoints.push({ x,y })
                this.ctx.beginPath()

                for (let i = 0; i < this.penPoints.length - 1; i++) {
                    const p1 = this.penPoints[i];
                    const p2 = this.penPoints[i+1]

                    this.ctx.moveTo(p1.x, p1.y)
                    this.ctx.lineTo(p2.x, p2.y)                    

                }
                this.ctx.strokeStyle = "rgba(255, 255, 255)"
                this.ctx.stroke()   
                
                
            } 
    }

    mouseMoveHandler = (e) => {
        if (this.clicked) {

             if (this.selectedTool === "Pan") {
                this.offsetX += e.movementX
                this.offsetY += e.movementY
                this.clearCanvas()
                return
            }

            const pos = this.getMousePos(e)
            const x = pos.x
            const y = pos.y
            
            const width = x - this.startX;
            const height = y - this.startY;

            console.log("move"+ x, y)
            this.clearCanvas(() => {
                this.drawPreviewShape(x, y, width, height)
            });
            
            //@ts-ignore

            
            
            
        }

    }
 
    initMouseHandlers() {
            this.canvas.addEventListener("mousedown", this.mouseDownHandler)

            this.canvas.addEventListener("mouseup", this.mouseUpHandler)

            this.canvas.addEventListener("mousemove", this.mouseMoveHandler) 
             

    }
}