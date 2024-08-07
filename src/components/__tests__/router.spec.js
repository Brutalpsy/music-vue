import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import SongItem from '../SongItem.vue';


describe('Router', () => {
    test('renders router link', () => {
        const song = {
            docId: 'abc'
        }

        const wrapper = shallowMount(SongItem, {
            props: {
                song
            },
            global: {
                components: {
                    'router-link': RouterLinkStub
                }
            }
        });

        expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
            name: 'song',
            params: {
                id: song.docId
            }
        })
    })
})