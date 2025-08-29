import {beforeAll, describe, expect, test} from "bun:test"

const backend_url = "ws://localhost:8081"
describe("chat application", ()=>{
    
    test("Message sent from room 1 reaches another particaipant room 2", async()=>{
        
        ///make the client 1 connect 
        const ws1 = new WebSocket(backend_url);

        //make the client 2 connect 
        const ws2 = new WebSocket(backend_url);


        //it wait for both of the code to get connected 
        await new Promise<void>((resolve, reject) =>{
            let count =0;

            ws1.onopen = () =>{
                count = count+1;
                if(count ==2){
                    resolve();
                }
            }

            ws2.onopen = () =>{
                count = count+1;
                if(count ==2){
                    resolve();
                }
            }
        })
            
        
        ws1.send(JSON.stringify({
                type:"join-room",
                room :"Room1"
            }))

        ws2.send(JSON.stringify({
                type : "join-room",
                room : "Room1"

            }))


            //second socket should ensure type to chat 
            //please run this condition is some message on the second socket 

        await new Promise<void>((resolve)=>{
            ws2.onmessage = ({data}) =>{
                console.log((data as Buffer).toString());
                const parsedData = JSON.parse(data);
                expect( parsedData.type == "chat");
                expect(parsedData.message == "Hi there ")
                resolve();
            }

            ws1.send(JSON.stringify({
                type: "chat",
                room : "Room1",
                message : "Hi there"
            }))
        })
      


            
    })

    }
)