"use client";

/**
 * 日付をフォーマットする関数
 * @param dateString
 * @returns
 */
export const formatDate = (dateString: string) => {
  const date = dateString ? new Date(dateString) : null;
  return date
    ? date.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : undefined;
};
