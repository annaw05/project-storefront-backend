import { User, UserStore } from '../../models/user';

const store = new UserStore();



describe('----------------- model: user -------------------', () => {
  describe('user model defined', () => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });

    it('should have a create method', () => {
      expect(store.create).toBeDefined();
    });

    it('should have a show method', () => {
      expect(store.show).toBeDefined();
    });

    it('should have an authenticate method', () => {
      expect(store.authenticate).toBeDefined();
    });
  });

  describe('CRUD APIs working', () => {
    const testuser1: User = {
      username: 'testUsername1',
      firstname: 'John',
      lastname: 'Doe',
      password: 'testpassword'
    };

    const testuser2: User = {
      username: 'testUsername2',
      firstname: 'Jane',
      lastname: 'Doe',
      password: 'testpassword2'
    };

    it('creates user in db', async () => {
      const result1 = await store.create(testuser1);
      const result2 = await store.create(testuser2);
      expect(result1.firstname).toBe('John');
      expect(result2.firstname).toBe('Jane');
    });

    it('should return list of all users ----> index method', async () => {
      const result = await store.index();
      expect(result.length).toEqual(2);
    });

    it('shows a specific user based on id ----> show method', async () => {
      const result = await store.show(1);
      expect(result.username).toEqual('testUsername1');
    });

    it('returns null when wrong combination username/password is given ----> authentification method', async () => {
      const result = await store.authenticate('testUsername1', 'testpassword5');
      expect(result).toBe('Error: password invalid');
    });
  });

  afterAll(async () => {
    await store.cleanTableUsers();
  });
});
