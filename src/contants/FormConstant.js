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
    base_inform: {
      title: "Thông tin doanh nghiệp",
      fields: {
        company_name: "Tên doanh nghiệp",
        mst: "Mã số doanh nghiệp/ mã số thuế",
        time_provide: "Ngày cấp",
        place_provide: "Nơi cấp",
      },
    },
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
        contact_reg_address: "Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn",
        contact_town: "Xã/Phường/Thị Trấn",
        contact_district: "Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh",
        contact_city: "Tỉnh/Thành phố",
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
      fields: {
        company_name: "Tên doanh nghiệp",
        mst: "Mã số doanh nghiệp/ mã số thuế",
        old: {
          address: "Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn cũ",
          town: "Xã/Phường/Thị Trấn cũ",
          district: "Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh cũ",
          city: "Tỉnh/Thành phố cũ",
        },
        new_location: {
          address: "Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn mới",
          town: "Xã/Phường/Thị Trấn mới",
          district: "Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh mới",
          city: "Tỉnh/Thành phố mới",
        },
        phone: "Số điện thoại",
        inside: "Doanh nghiệp nằm trong",
        legal_person: "Tên người đại diện pháp luật",
      },
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
    up_authorized_capital: {
      title: "Đăng kí thay đổi vốn điều lệ",
      fields: {
        company_name: "Tên doanh nghiệp",
        mst: "Mã số doanh nghiệp/ mã số thuế",
        base_val: {
          num: "Vốn điều lệ đã đăng ký (bằng số)",
          char: "Vốn điều lệ đã đăng ký (bằng chữ)",
        },
        new_base_val: {
          num: "Vốn điều lệ sau khi tăng (bằng số)",
          char: "Vốn điều lệ sau khi tăng (bằng chữ)",
        },
        type: "Hình thức tăng vốn",
      },
    },
    transfer_contract: {
      title: "Đăng ký thay đổi hợp đồng chuyển nhượng phần góp vốn",
      fields: {
        company_name: "Tên doanh nghiệp",
        mst: "Mã số doanh nghiệp",
        A_side: {
          owner: "Chủ sở hữu",
          personal: {
            name: "Họ và tên",
            birth_day: "Ngày sinh",
            doc_type: "Loại giấy tờ pháp lý",
            doc_code: "Số giấy tờ pháp lý",
            doc_time_provide: "Ngày cấp",
            doc_place_provide: "Nơi cấp",
            contact_address: "Địa chỉ liên lạc",
          },
          organization: {
            company_name: "Tên doanh nghiệp",
            mst: "Mã số doanh nghiệp",
            company_address: {
              street: "Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn",
              town: "Xã/Phường/Thị trấn",
              district: "Quận/Huyện/Thị xã/Thành phố thuộc tỉnh",
              city: "Tỉnh/Thành phố",
            },
            legal_representative: "Người đại diện theo pháp luật của công ty",
          },
        },
        B_side: {
          owner: "Chủ sở hữu",
          personal: {
            name: "Họ và tên",
            birth_day: "Ngày sinh",
            doc_type: "Loại giấy tờ pháp lý",
            doc_code: "Số giấy tờ pháp lý",
            doc_time_provide: "Ngày cấp",
            doc_place_provide: "Nơi cấp",
            reg_address: "Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn",
            town: "Xã/Phường/Thị Trấn",
            district: "Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh",
            city: "Tỉnh/Thành phố",
            contact_reg_address: "Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn",
            contact_town: "Xã/Phường/Thị Trấn",
            contact_district: "Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh",
            contact_city: "Tỉnh/Thành phố",
          },
          organization: {
            company_name: "Tên doanh nghiệp",
            mst: "Mã số doanh nghiệp",
            time_provide: "Ngày cấp",
            place_proive: "Nơi cấp",
            company_address: {
              street: "Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn",
              town: "Xã/Phường/Thị trấn",
              district: "Quận/Huyện/Thị xã/Thành phố thuộc tỉnh",
              city: "Tỉnh/Thành phố",
            },
            legal_representative: "Người đại diện theo pháp luật của công ty",
            legal_title: "Chức danh",
            capital_contribution: {
              current_value: "Vốn sở hữu",
              type: "Loại chuyển nhượng",
              will: "Phần vốn góp bên A muốn chuyển nhượng",
              current_A_percent: "Chiếm tỉ lệ",
              transfer_price: "Giá chuyển nhượng",
              time_end: "Thời điểm hoàn thành việc chuyển nhượng (Chọn Ngày/ tháng/ năm)",
            },
            company_model: "Mô hình công ty",
          },
        },
      },
    },
    company_career: {
      title: "Đăng ký thay đổi ngành nghề kinh doanh",
      fields: {
        company_name: "Tên doanh nghiệp",
        mst: "Mã số doanh nghiệp",
        include: "Bổ sung ngành, nghề kinh doanh",
        exclude: "Bỏ ngành, nghề kinh doanh",
        legal_person: "Tên người Đại diện pháp luật",
        detail_after: "Sửa đổi chi tiết ngành, nghề kinh doanh sau",
      },
    },

    name: {
      title: "Đăng ký thay đổi tên doanh nghiệp",
      fields: {
        company_name: "Tên doanh nghiệp",
        mst: "Mã số doanh nghiệp/ mã số thuế",
        base_type: "Doanh nghiệp đăng ký thay đổi tên cơ sở",
        name_vi: "Tên công ty bằng tiếng Việt",
        name_en: "Tên công ty bằng tiếng nước ngoài",
        name_etc: "Tên công ty viết tắt",
        legal_person: "Tên người đại diện pháp luật",
      },
    },
    tax: {
      title: "Đăng ký thay đổi thông tin đăng ký thuế",
      fields: {
        company_name: "Tên doanh nghiệp",
        mst: "Mã số doanh nghiệp",
        address: "Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn",
        town: "Xã/Phường/Thị trấn",
        district: "Quận/Huyện/Thị xã/Thành phố thuộc tỉnh",
        city: "Tỉnh/Thành phố",
        start_active: "Ngày bắt đầu hoạt động",
        accounting: "Hình thức hạch toán",
        start_date: "Bắt đầu từ ngày (chọn ngày/ tháng)",
        end_date: "Đến ngày (chọn ngày/ tháng)",
        employee: "Tổng số lao động",
        active_BOT: "Có hoạt động theo dự án BOT/BTO/BT/BOO, BLT, BTL, O&M không",
      },
    },
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
          gender: "Giới tính",
          birth_day: "Ngày sinh",
          current_address: "Chỗ ở hiện tại",
          national: "Quốc tịch",
          per_type: "Dân tộc",
          reg_address: "Nơi đăng kí hộ khẩu thường trú",
          doc_type: "Loại giấy tờ",
          doc_code: "Mã doanh nghiệp",
          doc_time_provide: "Ngày cấp",
          doc_place_provide: " Nơi cấp",
          contact: {
            address: "Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn",
            town: "Xã/Phường/Thị trấn",
            district: "Quận/Huyện/Thị xã/Thành phố thuộc tỉnh",
            city: "Tỉnh/Thành phố",
          },
          company: {
            address: "Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn",
            town: "Xã/Phường/Thị trấn",
            district: "Quận/Huyện/Thị xã/Thành phố thuộc tỉnh",
            city: "Tỉnh/Thành phố",
            national: "Quốc gia",
          },
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
          doc_type: "Loại giấy tờ pháp lý",
          doc_code: "Số giấy tờ pháp lý",
          doc_time_provide: "Ngày cấp",
          doc_place_provide: " Nơi cấp",
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
      fields: {
        company_name: "Tên doanh nghiệp (ghi bằng chữ in hoa)",
        mst: "Mã số doanh nghiệp/Mã số thuế",
        opt_code: "Số Giấy chứng nhận đăng ký kinh doanh (chỉ kê khai nếu không có mã số doanh nghiệp/mã số thuế)",
        time_provide: "Ngày cấp",

        place_provide: "Nơi cấp",
        obj: "Đối tượng tạm ngưng",
        branch: {
          branch_name: "Tên chi nhánh/văn phòng đại diện/địa điểm kinh doanh (ghi bằng chữ in hoa)",
          resp_office: "Mã số thuế chi nhánh/văn phòng đại diện/địa điểm kinh doanh",
          branch_name_opt: "Tên chi nhánh (optional)",
          branch_mst_opt: "Mã số chi nhánh/Mã số thuế của chi nhánh  (optional)",
        },
        time_range: {
          start: "Thời gian đăng ký tạm ngưng từ",
          end: "Thời gian đăng ký tạm ngưng đến",
        },
        reason: "Lý do tạm ngưng",
        org_person: "Tên người đại diện pháp luật/người đứng đầu chi nhánh",
      },
      // Kinh doanh lại trước thời hạn
    },
    approve: {
      // Tạm ngưng kinh doanh
      title: "Tạm ngưng kinh doanh",
      fields: {
        company_name: "Tên doanh nghiệp (ghi bằng chữ in hoa)",
        mst: "Mã số doanh nghiệp/Mã số thuế",
        time_provide: "Ngày cấp",
        place_provide: "Nơi cấp",
        opt_code: "Số Giấy chứng nhận đăng ký kinh doanh (chỉ kê khai nếu không có mã số doanh nghiệp/mã số thuế)",
        obj: "Đối tượng tạm ngưng",
        branch: {
          branch_name: "Tên chi nhánh/văn phòng đại diện/địa điểm kinh doanh (ghi bằng chữ in hoa)",
          resp_office: "Mã số thuế chi nhánh/văn phòng đại diện/địa điểm kinh doanh",
          branch_name_opt: "Tên chi nhánh (optional)",
          branch_mst_opt: "Mã số chi nhánh/Mã số thuế của chi nhánh  (optional)",
        },
        time_range: {
          start: "Thời gian đăng ký tạm ngưng từ",
          end: "Thời gian đăng ký tạm ngưng đến",
        },
        reason: "Lý do tạm ngưng",
        org_person: "Tên người đại diện pháp luật/người đứng đầu chi nhánh",
      },
    },
  },
  dissolution: {
    approve: {
      title: "Giải thể",
      fields: {
        company_name: "Tên doanh nghiệp (ghi bằng chữ in hoa)",
        mst: "Mã số doanh nghiệp/Mã số thuế",
        company_address: "Địa chỉ trụ sở chính",
        time_provide: "Ngày cấp",
        place_provide: "Nơi cấp",
        opt_code: "Số Giấy chứng nhận đăng ký kinh doanh (chỉ kê khai nếu không có mã số doanh nghiệp/mã số thuế)",
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
