import SongItem from '@/components/SongItem.vue';
import { shallowMount, RouterLinkStub } from '@vue/test-utils';

describe('SongItem.vue', () => {
    test('renders song.display_name', () => {

        const song = {
            display_name: 'test'
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
        const compositionAuthor = wrapper.find('.text-gray-500');


        expect(compositionAuthor.text()).toBe(song.display_name);

    })


    test('renders song.docId in element', () => {

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

        // expect(wrapper.attributes().id).toBe(`song-id-${song.docId}`)
        expect(wrapper.classes()).toContain(`song-id-${song.docId}`)
    })
})