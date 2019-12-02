const Sequelize = require('sequelize');
const conn = new Sequelize('postgres://localhost:5432/calender', {
  logging: false
});
const months = [
  { name: 'jan' },
  { name: 'feb' },
  { name: 'mar' },
  { name: 'apr' },
  { name: 'may' },
  { name: 'jun' },
  { name: 'jul' },
  { name: 'aug' },
  { name: 'sep' },
  { name: 'oct' },
  { name: 'nov' },
  { name: 'dec' }
];
const Year = conn.define('year', {
  num: {
    type: Sequelize.INTEGER
  }
});
const Month = conn.define('month', {
  name: {
    type: Sequelize.STRING
  }
});
const Day = conn.define('day', {
  day: {
    type: Sequelize.INTEGER
    // 2019/11/5
  }
});
const Event = conn.define('event', {
  task: { type: Sequelize.TEXT, allowNull: false }
  // time: Sequelize.TIME
});
Event.belongsTo(Day);
Day.hasMany(Event);
Event.belongsTo(Month);
Month.hasMany(Event);
Event.belongsTo(Year);
Year.hasMany(Event);
const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const years = [{ num: 2020 }, { num: 2021 }, { num: 2022 }];

  // const [yearOne,yearTwo,yearThree]=
  await Promise.all(years.map(year => Year.create(year)));

  const allMonths = await Promise.all(
    months.map((month, idx) => Month.create({ id: idx + 1, ...month }))
  );
  // const days = () => {
  //   const arr = [];
  //   for (let i = 1; i <= 30; i++) {
  //     arr.push({
  //       day: i
  //     });
  //   }
  //   arr.sort((firstElement, nextElement) => {
  //     return firstElement.day - nextElement.day;
  //   });
  //   return arr;
  // };
  const days = [
    { day: 1 },
    { day: 2 },
    { day: 3 },
    { day: 4 },
    { day: 5 },
    { day: 6 },
    { day: 7 },
    { day: 8 },
    { day: 9 },
    { day: 10 },
    { day: 11 },
    { day: 12 },
    { day: 13 },
    { day: 14 },
    { day: 15 },
    { day: 16 },
    { day: 17 },
    { day: 18 },
    { day: 19 },
    { day: 20 },
    { day: 21 },
    { day: 22 },
    { day: 23 },
    { day: 24 },
    { day: 25 },
    { day: 26 },
    { day: 27 },
    { day: 28 },
    { day: 29 },
    { day: 30 }
  ];

  const allDays = await Promise.all(days.map(day => Day.create(day)));
  await Promise.all([
    Event.create({
      task: 'MY BIRTHDAY',
      dayId: allDays[1].id,
      monthId: allMonths[0].id
      // yearId: yearOne.id
    })
  ]);
};

module.exports = { syncAndSeed, Day, Year, Month, Event };
