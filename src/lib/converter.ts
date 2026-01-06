/**
 * 10진수 -> 2진수 변환 (4자리마다 공백 추가)
 */
export const decimalToBinary = (decimal: string): string => {
  const num = parseInt(decimal, 10);
  if (isNaN(num)) return "";

  // 부호 없는 32비트 정수 처리 후 2진수 변환
  const binary = (num >>> 0).toString(2);

  // UX: 뒤에서부터 4자리마다 공백을 넣어 가독성 향상
  // 예: 10101010 -> 1010 1010
  return binary.replace(/\B(?=(\d{4})+(?!\d))/g, " ");
};

/**
 * 2진수 -> 10진수 변환
 */
export const binaryToDecimal = (binary: string): string => {
  // 공백 제거
  const cleanBinary = binary.replace(/\s/g, "");

  // 0과 1만 있는지 검사 (입력 필터링)
  if (!/^[01]*$/.test(cleanBinary)) return "Invalid";

  const decimal = parseInt(cleanBinary, 2);
  return isNaN(decimal) ? "" : decimal.toString(10);
};
