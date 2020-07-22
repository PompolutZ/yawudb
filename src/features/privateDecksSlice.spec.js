import privateDecks, { addDeck, addDecks, deleteDeck, togglePublicVisibility } from './privateDecksSlice';

describe('private decks reducer', () => {
    it('should handle initial state', () => {
        expect(privateDecks(undefined, {})).toEqual({});
    });

    it('should handle add deck', () => {
        expect(privateDecks(undefined, {
            type: addDeck.type,
            payload: {
                id: '1',
                data: { author: 'Test' }
            }
        }))
        .toEqual({
            1: {
                author: 'Test'
            }
        })
    });

    it('should handle add multiple decks', () => {
        expect(privateDecks(undefined, {
            type: addDecks.type,
            payload: {
                '1': {
                    author: 'Test',
                },
                '2': {
                    author: 'Test'
                }
            }
        }))
        .toEqual({
            '1': {
                author: 'Test',
            },
            '2': {
                author: 'Test'
            }
        })
    });

    it('should handle delete deck', () => {
        expect(privateDecks({
            '1': {
                author: 'Test'
            }
        }, {
            type: deleteDeck.type,
            payload: '1',
        }))
        .toEqual({})
    });

    it('should handle toggle public visibility', () => {
        expect(privateDecks({
            '1': {
                private: false
            }
        }, {
            type: togglePublicVisibility.type,
            payload: '1'
        }))
        .toEqual({
            '1': {
                private: true
            }
        })
    })
})