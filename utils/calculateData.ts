const calculateDate = (createdAt: string) => {
  const nowDate = new Date();
  const utcDate = new Date(createdAt); // UTC 시간
  const kstOffset = 9 * 60 * 60 * 1000; // KST offset (9시간)
  const kst = new Date(utcDate.getTime() + kstOffset); // KST로 변환
  const kstDate = (Number(nowDate) - Number(kst)) / 1000; // 초 단위로 변환

  if (kstDate < 60 * 2) {
    return { time: 1, result: '분' };
  }
  if (kstDate < 60 * 60) {
    const minute = Math.floor(kstDate / 60);
    return { time: minute, result: '분' };
  }
  if (kstDate < 60 * 60 * 24) {
    const hour = Math.floor(kstDate / 3600);
    return { time: hour, result: '시간' };
  }
  if (kstDate < 60 * 60 * 24 * 30) {
    const day = Math.floor(kstDate / 86400);
    return { time: day, result: '일' };
  }
  if (kstDate < 60 * 60 * 24 * 30 * 12) {
    const month = Math.floor(kstDate / 2592000);
    return { time: month, result: '달' };
  }
  const year = Math.floor(kstDate / 31536000);
  return { time: year, result: '년' };
};

export default calculateDate;
