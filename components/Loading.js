import { Circle } from "better-react-spinkit";

function Loading() {
    return (
        <center style={{display: "grid", placeItems: "center", height: "100vh"}}>
            <div>
                <img 
                    src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" 
                    alt="" 
                    height={200}
                    style={{marginBottom: 10}}
                />
                <Circle color="#909090" size={40}></Circle>
            </div>
        </center>
    )
}

export default Loading
