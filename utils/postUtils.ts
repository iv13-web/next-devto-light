export const countWords = (text: string): number => {
	return text.trim().split(/\s+/g).length
}

export const countMinutesToRead = (wordCount: number): string => {
	return (wordCount / 100 + 1).toFixed(0)
}

export const convertTimestampToDate = (dateObj: Date): string => {
	return dateObj.toLocaleDateString('ru')
}