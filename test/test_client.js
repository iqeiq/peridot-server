const WebSocket = require('ws');
const _ = require('underscore');

const ws = new WebSocket('ws://localhost:9777', {
  perMessageDeflate: false
});

const send = (type, data) => {
    const json = _.clone(data);
    json.type = type;
    ws.send(JSON.stringify(json));
};


ws.on('open', ()=> {
    console.log('connected');    
});

ws.on('message', (data) => {
    const json = JSON.parse(data);
    console.log(json);
    if(json.type === 'hello') {
        const uuid = json.uuid;
        send('test', {user: uuid, test1: 0, test2: 'aaa'});
    }
});
