const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'admin';
        var text = 'Some message';
        var message = generateMessage(from, text);
        
        expect(typeof(message.createdAt)).toBe('number');
        expect(message).toMatchObject({
            from,
            text
        });
    })
});