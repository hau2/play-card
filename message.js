const message = [
    ['Nhanh lên bạn'],
    ['Thua làm choá'],
    ['Lâu thế'],
    ['Tham thì thâm nghe'],
]

function randomeMessage (message) {
    let rand = (Math.floor(Math.random() * message.length) + 0);
    let mess = message[rand];
    return mess;
}

export const MESSAGE = message;
export const RANDOM_MESS = randomeMessage;