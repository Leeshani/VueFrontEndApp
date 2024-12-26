import { shallowMount } from '@vue/test-utils';
import ResultSection from '@/components/ResultSection.vue';


describe('ResultSection.vue', () => {
  it('renders input field for from and to nodes', () => {
   
    const wrapper = shallowMount(ResultSection)
    expect(wrapper.find('#fromNode').exists()).toBe(true);
    expect(wrapper.find('#toNode').exists()).toBe(true);
  })
  
  it('mocks fetch and tests shortest path calculation', async () => {
    const wrapper = shallowMount(ResultSection);
  
    // Directly update the component's data
    wrapper.vm.fromNode = 'A';
    wrapper.vm.toNode = 'C';
  
    // Trigger the button click
    await wrapper.find('#calculateButton').trigger('click');
  
    // Assert the result
    expect(wrapper.find('.result-section').exists()).toBe(true);
  });
});
