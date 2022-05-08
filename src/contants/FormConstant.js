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
      fields: {
        company_name: "Tên doanh nghiệp",
        mst: "Mã số doanh nghiệp/ mã số thuế",
        base_val: {
          num: "Vốn điều lệ đã đăng ký (bằng số)",
          char: "Vốn điều lệ đã đăng ký (bằng chữ)",
        },
        new_base_val: {
          num: "Vốn điều lệ sau khi giảm (bằng số)",
          char: "Vốn điều lệ sau khi giảm (bằng chữ)",
        },
        type: "Hình thức giảm vốn",
      },
    },
    transfer_contract: { title: "Đăng ký thay đổi hợp đồng chuyển nhượng phần góp vốn", fields: {} },
    company_career: { title: "Đăng ký thay đổi ngành nghề kinh doanh", fields: {} },
    up_authorized_capital: { title: "Đăng kí thay đổi vốn điều lệ", fields: {} },
    name: {
      title: "Đăng ký thay đổi tên doanh nghiệp",
      fields: {
        company_name: "Tên doanh nghiệp",
        mst: "Mã số doanh nghiệp/ mã số thuế",
        base_type: "Doanh nghiệp đăng ký thay đổi tên cơ sở",
        name_en: "Tên công ty bằng tiếng nước ngoài",
        name_etc: "Tên công ty viết tắt",
        legal_person: "Tên người đại diện pháp luật",
      },
    },
    tax: { title: "Đăng ký thay đổi thông tin đăng ký thuế", fields: {} },
  },
  create_company: {
    // Thành lập công ty
    approve: {
      title: "Thành lập doanh nghiệp",
      fields: {
        base_val: {
          num: "Vốn điều lệ (bằng số)",
          char: "Vốn điều lệ (bằng chữ)",
        },
        origin_person: {
          name: "Thành viên góp vốn",
          doc_type: "Loại giấy tờ",
          doc_code: "Mã doanh nghiệp",
          doc_time_provide: "Ngày cấp",
          doc_place_provide: " Nơi cấp",
        },
        present_person: "Người đại diện",
        company_value: "Giá trị góp vốn",
        legal_respon: {
          name: "Họ và tên",
          gender: "Giới tính",
          birth_day: "Ngày sinh",
          per_type: "Dân tộc",
          reg_address: "Nơi đăng kí hộ khẩu thường trú",
          current_address: "Nơi ở hiện tại",
          doc_type: "Loại giấy tờ",
          doc_code: "Số CMND/ CCCD/ Hộ chiếu",
          doc_time_provide: "Ngày cấp",
          doc_place_provide: " Nơi cấp",
          title: "Chức danh",
          national: "Quốc tịch",
        },
        per_main: {
          name: "Họ và tên",
          gender: "Giới tính",
          birth_day: "Ngày sinh",
          per_type: "Dân tộc",
          reg_address: "Nơi đăng kí hộ khẩu thường trú",
          current_address: "Chỗ ở hiện tại",
        },
        company_core: {
          name: "Tên công ty bằng Tiếng Việt",
          name_en: "Tên công ty bằng Tiếng Anh (nếu có)",
          name_vn: "Tên công ty viết tắt (nếu có)",
          address: "Địa chỉ trụ sở chính",
          address_opt_1: "Địa chỉ chi nhánh (nếu có)",
          address_opt_2: "Địa chỉ văn phòng đại diện (nếu có)",
        },
        company_main_career: "Ngành nghề chính",
        company_opt_career: "Ngành nghề phụ",
      },
    },
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
  uy_quyen: {
    approve: {
      title: "Ủy quyền",
      fields: {
        name: "Họ và tên",
        birth_day: "Ngày tháng năm sinh",
        per_type: "Dân tộc",
        national: "Quốc tịch",
        doc_code: "CMND/CCCD/Hộ chiếu số",
        doc_time_provide: "Cấp ngày",
        doc_place_provide: "Nơi cấp",
        reg_address: "Nơi đăng ký hộ khẩu thường trú",
      },
    },
  },
};
