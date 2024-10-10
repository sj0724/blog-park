const generateSafeFileName = (fileName: string) => {
  const extension = fileName.split('.').pop();
  const baseName = fileName
    .replace(/[^a-zA-Z0-9]/g, '_') // 영어와 숫자만 남기고 _로 변환
    .slice(0, 50);

  return `${baseName}.${extension}`;
};

export default generateSafeFileName;
