/**
 * Strategic Dashboard Filter Options
 * Options for filtering dashboard data by time, target, and group
 */

// Time period filter options
export const TIME_OPTIONS = [
  "7 ngày qua",
  "30 ngày qua",
  "90 ngày qua",
  "Quý này",
  "Năm nay",
] as const;

// Target audience filter options
export const TARGET_OPTIONS = [
  "Tất cả đối tượng",
  "Hội viên",
  "Doanh nghiệp",
  "Đối tác",
] as const;

// Member group filter options
export const GROUP_OPTIONS = [
  "Tất cả nhóm",
  "Hội viên Vàng",
  "Hội viên Bạc",
  "Hội viên Đồng",
] as const;

// Types
export type TimeOption = (typeof TIME_OPTIONS)[number];
export type TargetOption = (typeof TARGET_OPTIONS)[number];
export type GroupOption = (typeof GROUP_OPTIONS)[number];

export interface StrategicFilter {
  time: TimeOption;
  targets: TargetOption[];
  groups: GroupOption[];
}

// Default filter values
export const DEFAULT_FILTER: StrategicFilter = {
  time: TIME_OPTIONS[0],
  targets: [TARGET_OPTIONS[0]],
  groups: [GROUP_OPTIONS[0]],
};
