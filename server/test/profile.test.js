import { expect, server, BASE_URL } from './setup';
describe('Profile', () => {
  it('get profile page', done => {
    server
      .get(`${BASE_URL}/profile`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.messages).to.be.instanceOf(Array);
        res.body.messages.forEach(m => {
          expect(m).to.have.property('username');
          expect(m).to.have.property('userid');
        });
        done();
      });
  });
  it('posts profile', done => {
    const data = { name: 'Test Name', id: 'Test Id' };
    server
      .post(`${BASE_URL}/profile`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.messages).to.be.instanceOf(Array);
        res.body.messages.forEach(m => {
          expect(m).to.have.property('id');
          expect(m).to.have.property('username', data.name);
          expect(m).to.have.property('userid', data.id);
        });
        done();
      });
  });
});