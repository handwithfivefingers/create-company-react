const file_contants = {
  // create_company
  create_company_uyquyen: {
    name: "Ủy quyền",
    path: "/files/create_company/create_company_uyquyen.doc",
  },
  create_company_dieuleA: {
    name: "Điều lệ cá nhân",
    path: "/files/create_company/create_company_File_1A_DieuLeCaNhan.docx",
  },
  create_company_dieuleB: {
    name: "Điều lệ tổ chức",
    path: "/files/create_company/create_company_File_1B_DieuLeToChuc.docx",
  },
  create_company_phu_luc_2: {
    name: "Phụ lục I - 2",
    path: "/files/create_company/create_company_File_2_PhuLuc_I_2_GiayDeNghiDangKiMTV.docx",
  },
  create_company_phu_luc_4: {
    name: "Phụ lục I - 10",
    path: "/files/create_company/create_company_File_4_PhuLuc_I_10_DanhSachNguoiDaiDien.docx",
  },

  // change_info
  change_info_hop_dong_chuyen_nhuong: {
    name: "Hợp đồng chuyển nhượng",
    path: "/files/change_info/change_info_File_B_hopdong.docx",
  },
  change_info_quyetdinh: {
    name: "Quyết định",
    path: "/files/change_info/change_info_quyetdinh.docx",
  },
  change_info_phu_luc_2: {
    name: "Đăng kí MTV",
    path: "/files/change_info/change_info_File_2_PhuLuc_I_2_GiayDeNghiDangKiMTV.docx",
  },
  change_info_phu_luc_4: {
    name: "Danh sách người đại diện",
    path: "/files/change_info/change_info_File_4_PhuLuc_I_10_DanhSachNguoiDaiDien.docx",
  },
  change_info_uyquyen: {
    // ??
    name: "Ủy quyền",
    path: "/files/change_info/change_info_uyquyen.doc",
  },

  // pending
  pending_quyetdinh: {
    name: "Quyết định",
    path: "/files/pending/pending_File_1_quyetdinh.docx",
  }, // uy quyen
  pending_uyquyen: {
    name: "Ủy quyền",
    path: "/files/pending/pending_uyquyen.doc",
  }, // uy quyen
  pending_a_b: {
    name: "Phụ lục II - 19",
    path: "/files/pending/pending_File_A_B_Phuluc_II_19.docx",
  }, // phu luc 19

  // giai the
  giai_the_1: {
    name: "Quyết định",
    path: "/files/dissolution/dissolution_File_1_Quyetdinh.docx",
  },
  giai_the_A: {
    name: "A - Phụ lục - 22",
    path: "/files/dissolution/dissolution_File_A_Phuluc_22.docx",
  },
  giai_the_B: {
    name: "A - Phụ lục - 23",
    path: "/files/dissolution/dissolution_File_B_Phuluc_23.docx",
  },
  giai_the_uy_quyen: {
    name: "Ủy quyền",
    path: "/files/dissolution/dissolution_uyquyen.doc",
  },
};

exports.list_files = {
  create_company: {
    approve: {
      personal: [
        file_contants.create_company_dieuleA,
        file_contants.create_company_phu_luc_2,
        file_contants.create_company_uyquyen,
      ],
      organization: [
        file_contants.create_company_dieuleB,
        file_contants.create_company_phu_luc_2,
        file_contants.create_company_uyquyen,
        file_contants.create_company_phu_luc_4,
      ],
    },
  },
  change_info: {
    // Đại diện pháp luật: "Quyết định thay đổi", "Phụ lục II-2", "File_3_UyQuyen.doc",
    legal_representative: [
      file_contants.change_info_quyetdinh,
      file_contants.change_info_phu_luc_2,
      file_contants.change_info_uyquyen,
    ],

    // Người đại diện theo ủy quyền của chủ sở hữu là tổ chức: "Phụ lục II-1","File_3_UyQuyen.doc",
    present_change: [file_contants.phu_luc_1, file_contants.change_info_uyquyen],

    // Địa chỉ trụ sở chính: "Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
    location: [file_contants.change_info_quyetdinh, file_contants.phu_luc_1, file_contants.change_info_uyquyen],

    // Giảm vốn điều lệ: "Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
    down_authorized_capital: [
      file_contants.change_info_quyetdinh,
      file_contants.phu_luc_1,
      file_contants.change_info_uyquyen,
    ],

    // Chủ sở hữu: "Hợp đồng chuyển nhượng", "Phụ lục II-4","File_3_UyQuyen.doc",
    transfer_contract: [
      file_contants.change_info_hop_dong_chuyen_nhuong,
      file_contants.phu_luc_3,
      file_contants.change_info_uyquyen,
    ],

    // Ngành nghề kinh doanh:"Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
    company_career: [file_contants.change_info_quyetdinh, file_contants.phu_luc_1, file_contants.change_info_uyquyen],

    // Tăng vốn điều lệ:"Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
    up_authorized_capital: [
      file_contants.change_info_quyetdinh,
      file_contants.phu_luc_1,
      file_contants.change_info_uyquyen,
    ],

    // Tên doanh nghiệp:"Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
    name: [file_contants.change_info_quyetdinh, file_contants.phu_luc_1, file_contants.change_info_uyquyen],

    // Nội dung đăng ký thuế: "Phụ lục II-1","File_3_UyQuyen.doc",
    tax: [file_contants.phu_luc_1, file_contants.change_info_uyquyen],
  },
  pending: {
    approve: {},
    cancel: {},
  },
  dissolution: {
    approve: [file_contants.giai_the_1, file_contants.giai_the_A, file_contants.giai_the_uy_quyen],
    cancel: [file_contants.giai_the_B, file_contants.giai_the_uy_quyen],
  },
};
