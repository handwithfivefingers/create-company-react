export const FORM_SELECT = [
  {
    name: "CMND",
    value: "CMND",
  },
  {
    name: "CCCD",
    value: "CCCD",
  },
  {
    name: "Hộ chiếu",
    value: "Hộ chiếu",
  },
  {
    name: "Mã doanh nghiệp",
    value: "Mã doanh nghiệp",
  },
];

export const LABEL = {
  change_info: {
    // Thay đổi thông tin
    legal_representative: {
      title: "Đăng ký thay đổi người đại diện theo pháp luật",
      fields: {
        company_name: "Tên doanh nghiệp",
        mst: "Mã số doanh nghiệp/ mã số thuế",
        old_name: "Tên người đại diện pháp luật cũ",
        old_title: "Chức danh",
        new_name: "Họ và tên",
        gender: "Giới tính",
        new_title: "Chức danh",
        birth_day: "Ngày sinh",
        per_type: "Dân tộc",
        national: "Quốc tịch",
        doc_type: "Loại giấy tờ pháp lý",
        doc_code: "Số CMND/ CCCD/ Hộ chiếu",
        doc_time_provide: "Ngày cấp",
        doc_place_provide: "Nơi cấp",
        reg_address: "Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn",
        town: "Xã/Phường/Thị Trấn",
        district: "Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh",
        city: "Tỉnh/Thành phố",
      },
      // Đăng ký thay đổi người đại diện theo pháp luật
    },
    present_change: {
      // Người đại diện theo ủy quyền của chủ sở hữu là tổ chức
      title: "Người đại diện theo ủy quyền của chủ sở hữu là tổ chức",
      fields: {
        company_name: "Tên doanh nghiệp",
        mst: "Mã số doanh nghiệp/ mã số thuế",
      },
    },
    location: {
      // Đăng ký thay đổi địa chỉ trụ sở chính
      title: "Đăng ký thay đổi địa chỉ trụ sở chính",
      fields: {},
    },
    down_authorized_capital: {
      title: "Đăng kí thay đổi vốn điều lệ",
      fields: {},
    },
    transfer_contract: { title: "Đăng ký thay đổi hợp đồng chuyển nhượng phần góp vốn", fields: {} },
    company_career: { title: "Đăng ký thay đổi ngành nghề kinh doanh", fields: {} },
    up_authorized_capital: { title: "Đăng kí thay đổi vốn điều lệ", fields: {} },
    name: { title: "Đăng ký thay đổi tên doanh nghiệp", fields: {} },
    tax: { title: "Đăng ký thay đổi thông tin đăng ký thuế", fields: {} },
  },
  create_company: {
    // Thành lập công ty
    approve: {},
  },
  pending: {
    cancel: {
      title: "Kinh doanh lại trước thời hạn",
      fields: {},
      // Kinh doanh lại trước thời hạn
    },
    approve: {
      // Tạm ngưng kinh doanh
      title: "Tạm ngưng kinh doanh",
      fields: {},
    },
  },
  dissolution: {
    approve: {
      title: "Giải thể",
      fields: {
        company_address: "Địa chỉ trụ sở chính",
        company_name: "Tên doanh nghiệp (ghi bằng chữ in hoa)",
        mst: "Mã số doanh nghiệp/Mã số thuế",
        reason: "Lý do giải thể",
        representative: "Ông (bà) Chủ sở hữu/đại diện chủ sở hữu",
      },
      // Giải thể
    },
    cancel: {
      title: "Hủy bỏ giải thể",
      fields: {
        company_name: "Tên doanh nghiệp (ghi bằng chữ in hoa)",
        mst: "Mã số doanh nghiệp/Mã số thuế",
      },
    },
  },
};
