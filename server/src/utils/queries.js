export const createProfileTable = `
DROP TABLE IF EXISTS profile;
CREATE TABLE IF NOT EXISTS profile (
  id SERIAL PRIMARY KEY,
  userName VARCHAR DEFAULT '',
  userId VARCHAR NOT NULL
  )
  `;

export const insertProfile = `
INSERT INTO profile(userName, userId)
VALUES ('Haonan', 'Haonan Id'),
      ('Chance', 'Chance Id')
`;

export const dropProfileTable = 'DROP TABLE profile';
