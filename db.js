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
  task: { type: Sequelize.STRING }
  // time: Sequelize.TIME
});
Event.belongsTo(Day);
Day.hasMany(Event);
Day.belongsTo(Month);
Month.hasMany(Day);
Day.belongsTo(Year);
Year.hasMany(Day);
const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const years = [{ num: 2020 }, { num: 2021 }, { num: 2022 }];
  //   const ['2020','2021','2022']=
  await Promise.all(years.map(year => Year.create(year)));
  const [
    jan,
    feb,
    mar,
    apr,
    may,
    jun,
    jul,
    aug,
    sep,
    oct,
    nov,
    dec
  ] = await Promise.all(months.map(month => Month.create(month)));
  const days = () => {
    const arr = [];
    for (let i = 1; i <= 30; i++) {
      arr.push({
        day: i
      });
    }
    return arr;
  };

  const [
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    eleven,
    twelve,
    thirteen,
    fourteen,
    fifeteen,
    sixtheen,
    seventeen,
    eighteen,
    nineteen,
    tewnty,
    tewntyone,
    tewntytwo,
    tewntythree,
    tewntyfour,
    twentyfive,
    twentysix,
    twentyseven,
    twentyeight,
    twentynine,
    thirty
  ] = await Promise.all(days().map(day => Day.create(day)));
  await Promise.all([Event.create({ task: 'MY BIRTHDAY', dayId: two.id })]);
};

module.exports = { syncAndSeed, Day, Year, Month, Event };
