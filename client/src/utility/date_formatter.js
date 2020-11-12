export function translateDate(date) {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	const dt = new Date(date);
	return months[dt.getMonth()] + " " + (dt.getDate() + 1) + ", " + dt.getFullYear();
}

export function formatDate(date) {
	const dt = new Date(date);
  const month = dt.getMonth() < 9 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
  const numDate = dt.getDate() < 10 ? '0' + (dt.getDate() + 1) : (dt.getDate() + 1); 
  return dt.getFullYear() + "-" + month + "-" + numDate; 
}