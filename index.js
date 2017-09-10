const electron = require("electron")
const ffmpeg = require("fluent-ffmpeg")

const { app, BrowserWindow, ipcMain } = electron
// the app is a property of the electron object

let mainwindow;
var totalDuration = 0


app.on("ready", ()=>{
	mainwindow = new BrowserWindow({})	
	mainwindow.loadURL(`file://${__dirname}/index.html`)
	// the __dirname is the currentdirectory

})

ipcMain.on("videoSubmit", (event, pathsArray)=>{
	Promise.all(pathsArray).then((path)=>{
		ffmpeg.ffprobe(path[0], (err, metadata)=>{
			
			totalDuration += metadata.format.duration
			mainwindow.webContents.send("videoLength", totalDuration)
			
		})
		totalDuration = 0
	})
	
})