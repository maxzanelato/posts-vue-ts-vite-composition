export const periods = ['Today', 'This week', 'This Month'] as const;
export type Period = typeof periods[number];
