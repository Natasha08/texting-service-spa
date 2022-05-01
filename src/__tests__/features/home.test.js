describe('Home', () => {
  it('displays the home page', () => {
    const {container} = mountApp();
    expect(container.textContent).toContain('Hello World');
  });
});
