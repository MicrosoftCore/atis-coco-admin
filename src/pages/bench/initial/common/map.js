const approve_status_map = {
  '1': '未检测', // 未检测（首次使用）
  '2': '待检测', // 待检测（农户已提交）
  '3': '待检测', // 待检测（初检通过）
  '4': '待检测', // 待检测（初检驳回）
  '5': '已检测', // 已检测（专家检测通过）
  '6': '已检测' // 已检测（专家检测通过）
}

export { approve_status_map as ApproveStatusMap }
