const fs = require('fs');
const WebSocket = require('ws');
const base64url = require('base64url');
const webSocket = new WebSocket('wss://hushh-hushh-valet-chat.hf.space/websockets/ws');
let response={
    data:[

    ]
}
let access_token = 'ya29.a0AfB_byD2vINL6amJ3oAAGIAOp7QmOjV2I9NR3431eIsHlutgbFBsHX4Q7P9zxh3dJEuzb8XQgY_wKG9Bzt-XfGFvXaePkvQ-g-2-M9N1qrEOxneryh9n8U_WLa9WKhKyJBwOMkN8jyEVQtJ9i-vvrWjIwYtyDmDjrM4aCgYKAawSARASFQHGX2Mi_KV9vpgJynGzMtGBQ6pqJQ0170'
webSocket.onopen = (ev) => {
    console.log('on open')
    webSocket.send('{"access_token":"' + access_token + '"}')
}
webSocket.onmessage = (ev) => {
    console.log('on message')
    
    if (ev.data.startsWith("NEXT_MESSAGE")) {

    } else {
        try {
            let jsonMessage = JSON.parse(ev.data)
            //console.log(Object.keys(jsonMessage))
            response['data'].push(jsonMessage);
            // console.log(response)
            // console.log(jsonMessage)
            if ('attachments' in jsonMessage) {
                if (jsonMessage['attachments'] != null) {
                    for (let attachment of jsonMessage['attachments']) {
                        const base64String = base64url.toBase64(attachment['data']);

                        // Convert base64 to binary
                        const binaryData = Buffer.from(base64String, 'base64');

                        // Write binary data to a file
                        // fs.writeFile(attachment['filename']+'.pdf', binaryData, (err) => {
                        //     if (err) {
                        //         console.error('Error saving file:', err);
                        //         return;
                        //     }
                        //     console.log('File saved successfully.');
                        // });

                    }
                }
            }
        } catch (e) {
            console.log(e.message)
        }
    }
    // Write binary data to a file
    
    webSocket.close()
}
webSocket.onclose = () => {
    fs.appendFileSync('response.txt', JSON.stringify(response), (err) => {
        if (err) {
            console.error('Error saving file:', err);
            return;
        }
        console.log('File saved successfully.');
    });
    console.log('websocket closed')
}


