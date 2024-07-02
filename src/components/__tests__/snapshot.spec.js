import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import SongItem from '../SongItem.vue';

describe('Snapshots SongItem.vue', () => {

    test('renders correctly', () => {
        const song = {
            decId: 'abc',
            modified_name: 'test',
            display_name: 'test',
            comment_count: 5,
        };

        const wrapper = shallowMount(SongItem, {
            props: {
                song,
                index: 0
            },
            global: {
                components: {
                    'router-link': RouterLinkStub
                }
            }
        });

        expect(wrapper.element).toMatchSnapshot()

    })
})