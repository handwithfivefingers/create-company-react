import React, { useEffect, useRef } from "react";
import {
  Space,
  Row,
  Col,
  Card,
  Typography,
  Divider,
  Checkbox,
  Form,
  Table,
  Badge,
} from "antd";
// import Form from 'antd/lib/form/Form';
const Nguuonvondieule = [
  {
    Loainguonvon: "Vốn ngân sách nhà nước",
    sotien: "xxxxx",
    tyle: "xxx%",
  },
  {
    Loainguonvon: "Vốn tư nhân",
    sotien: "xxxxx",
    tyle: "xxx%",
  },
  {
    Loainguonvon: "Vốn nước ngoài",
    sotien: "xxxxx",
    tyle: "xxx%",
  },
  {
    Loainguonvon: "Vốn khác",
    sotien: "xxxxx",
    tyle: "xxx%",
  },
  {
    Loainguonvon: "Tổng cộng",
    sotien: "xxxxx",
    tyle: "xxx%",
  },
];
const Taisangopvon = [
  {
    STT: "1",
    Taisangopvon: "Đồng Việt Nam",
    Giatri: "xxx",
    Tyle: "xxx%",
  },
  {
    STT: "2",
    Taisangopvon:
      "Ngoại tệ tự do chuyển đổi (ghi rõ loại ngoại tệ, số tiền được góp bằng mỗi loại ngoại tệ)",
    Giatri: "xxx",
    Tyle: "xxx%",
  },
  {
    STT: "3",
    Taisangopvon: "Vàng",
    Giatri: "xxx",
    Tyle: "xxx%",
  },
  {
    STT: "4",
    Taisangopvon: "Quyền sử dụng đất",
    Giatri: "xxx",
    Tyle: "xxx%",
  },
  {
    STT: "5",
    Taisangopvon: "Quyền sở hữu trí tuệ",
    Giatri: "xxx",
    Tyle: "xxx%",
  },
  {
    STT: "6",
    Taisangopvon:
      "Các tài sản khác (ghi rõ loại tài sản, số lượng và giá trị còn lại của mỗi loại tài sản, có thể lập thành danh mục riêng kèm theo hồ sơ đăng ký doanh nghiệp)",
    Giatri: "xxx",
    Tyle: "xxx%",
  },
  {
    STT: "",
    Taisangopvon: "Tổng số",
    Giatri: "xxx",
    Tyle: "xxx%",
  },
];
const Thongtindangkythue = [
  {
    STT: "10.1",
    Cacchitieu: (
      <div>
        Thông tin về Giám đốc/Tổng giám đốc{" "}
        <Typography.Text italic>(nếu có)</Typography.Text>:<br></br>Họ và tên
        Giám đốc/Tổng giám đốc: …………………………….<br></br>Điện thoại:
        ………………………………………………………….
      </div>
    ),
  },
  {
    STT: "10.2",
    Cacchitieu: (
      <div>
        Thông tin về Kế toán trưởng/Phụ trách kế toán{" "}
        <Typography.Text italic>(nếu có)</Typography.Text>:<br></br>Họ và tên Kế
        toán trưởng/Phụ trách kế toán: …………………………<br></br>Điện thoại:
        …………………………………………………………….
      </div>
    ),
  },
  {
    STT: "10.3",
    Cacchitieu: (
      <div>
        Địa chỉ nhận thông báo thuế{" "}
        <Typography.Text italic>
          (chỉ kê khai nếu địa chỉ nhận thông báo thuế khác địa chỉ trụ sở
          chính)
        </Typography.Text>
        :<br></br>Số nhà, ngách, hẻm, ngõ, đường
        phố/tổ/xóm/ấp/thôn:............................<br></br>Xã/Phường/Thị
        trấn: …………………………………………………. <br></br>Quận/Huyện/Thị xã/Thành phố thuộc
        tỉnh: ……………………………<br></br>Tỉnh/Thành phố: ………………………………………………………..
        <br></br>Điện thoại <Typography.Text italic>(nếu có)</Typography.Text>:
        …………………Fax <Typography.Text italic>(nếu có)</Typography.Text>: ……………..……
        <br></br>Email <Typography.Text italic>(nếu có)</Typography.Text>:
        …………………………………………………………
      </div>
    ),
  },
  {
    STT: "10.4",
    Cacchitieu: (
      <div>
        Ngày bắt đầu hoạt động7{" "}
        <Typography.Text italic>
          (trường hợp doanh nghiệp dự kiến bắt đầu hoạt động kể từ ngày được cấp
          Giấy chứng nhận đăng ký doanh nghiệp thì không cần kê khai nội dung
          này)
        </Typography.Text>
        : …../…../…….
      </div>
    ),
  },
  {
    STT: "10.5",
    Cacchitieu: (
      <div>
        Hình thức hạch toán{" "}
        <Typography.Text italic>
          (Đánh dấu X vào một trong hai ô “Hạch toán độc lập” hoặc “Hạch toán
          phụ thuộc”. Trường hợp tích chọn ô “Hạch toán độc lập” mà thuộc đối
          tượng phải lập và gửi báo cáo tài chính hợp nhất cho cơ quan có thẩm
          quyền theo quy định thì tích chọn thêm ô “Có báo cáo tài chính hợp
          nhất”)
        </Typography.Text>
        :<br />
        <Checkbox>Hạch toán độc lập</Checkbox>
        <Checkbox>Có báo cáo tài chính hợp nhất</Checkbox> <br />
        <Checkbox>Hạch toán phụ thuộc</Checkbox> <br />
      </div>
    ),
  },
  {
    STT: "10.6",
    Cacchitieu: (
      <div>
        Năm tài chính:<br></br>Áp dụng từ ngày …../…..đến ngày …../…..8<br></br>
        <Typography.Text italic>
          (ghi ngày, tháng bắt đầu và kết thúc niên độ kế toán)
        </Typography.Text>
      </div>
    ), // số 8 font nhỏ
  },
  {
    STT: "10.7",
    Cacchitieu: (
      <div>
        Tổng số lao động <Typography.Text italic>(dự kiến)</Typography.Text>:
        ……………………………………………{" "}
      </div>
    ),
  },
  {
    STT: "10.8",
    Cacchitieu: (
      <div>
        Hoạt động theo dự án BOT/BTO/BT/BOO, BLT, BTL, O&M:
        <br />
        <Checkbox>Có</Checkbox>
        <Checkbox>Không</Checkbox> <br />
      </div>
    ),
  },
  {
    STT: "10.9", // số 9 font nhỏ
    Cacchitieu: (
      <div>
        Phương pháp tính thuế GTGT{" "}
        <Typography.Text italic>(chọn 1 trong 4 phương pháp)</Typography.Text>9:{" "}
        <br />
        <Checkbox>Khấu trừ</Checkbox> <br />
        <Checkbox>Trực tiếp trên GTGT</Checkbox> <br />
        <Checkbox>Trực tiếp trên doanh số</Checkbox> <br />
        <Checkbox>Không phải nộp thuế GTGT</Checkbox> <br />
      </div>
    ),
  },
];
const File2 = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <Row gutter={[16, 12]}>
        <Col span={24} align="center">
          <Typography.Text>
            <b>
              Phụ lục I-2
              <br />
            </b>
            <i>
              (Ban hành kèm theo Thông tư số 01/2021/TT-BKHĐT <br />
              ngày 16 tháng 03 năm 2021 của Bộ trưởng Bộ Kế hoạch và Đầu tư)
              <br />
              <Divider
                style={{
                  width: "50px",
                  minWidth: 50,
                  maxWidth: 50,
                  margin: "10px 0",
                }}
              />
            </i>
          </Typography.Text>

          <Typography.Title level={4}>
            CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </Typography.Title>
          <Typography.Title level={4}>
            Độc lập - Tự do - Hạnh phúc
          </Typography.Title>

          <Divider style={{ minWidth: 287, maxWidth: 287, margin: "10px 0" }} />
        </Col>
      </Row>
      <Row gutter={[16, 12]}>
        <Col span={24} align="center">
          <Typography.Text italic>
            {" "}
            ...... , ngày {new Date().getDate()} tháng{" "}
            {new Date().getMonth() * 1 + 1} năm {new Date().getFullYear()}{" "}
          </Typography.Text>
        </Col>
      </Row>
      <Row gutter={[16, 12]}>
        <Col span={24} align="center">
          <Typography.Title level={5}>
            GIẤY ĐỀ NGHỊ ĐĂNG KÝ DOANH NGHIỆP
            <br />
            CÔNG TY TNHH MỘT THÀNH VIÊN
          </Typography.Title>
          <Typography.Text>
            Kính gửi: Phòng Đăng ký kinh doanh tỉnh, thành phố ………
            <br />
          </Typography.Text>
        </Col>
      </Row>
      <Row gutter={[16, 12]}>
        <Col span={24} align="center">
          <Typography.Text>
            {" "}
            Tôi là<sup>11</sup>
            <Typography.Text italic>
              (ghi họ tên bằng chữ in hoa)
            </Typography.Text>
            : ............................... <br />
          </Typography.Text>
          {/**HỌ VÀ TÊN BẮT BUỘC IN HOA*/}
          <Typography.Text strong>
            Đăng ký công ty trách nhiệm hữu hạn một thành viên do tôi
            <br />
            là người đại diện theo pháp luật/Chủ tịch công ty/Chủ tịch Hội đồng
            thành viên <sup>22</sup> <br /> với các nội dung sau: <br />
          </Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 12]}>
        <Col span={24} align="left">
          <Typography.Text strong>1. Tình trạng thành lập</Typography.Text>
          <Typography.Text italic>(đánh dấu X vào ô thích hợp)</Typography.Text>
          <br />
          <div className="right_left">
            <Checkbox>Thành lập mới</Checkbox>
            <Checkbox>Thành lập trên cơ sở tách doanh nghiệp</Checkbox>
            <Checkbox>Thành lập trên cơ sở chia doanh nghiệp</Checkbox>
            <Checkbox>Thành lập trên cơ sở hợp nhất doanh nghiệp</Checkbox>
            <Checkbox>
              Thành lập trên cơ sở chuyển đổi loại hình doanh nghiệp
            </Checkbox>
            <Checkbox>
              Thành lập trên cơ sở chuyển đổi từ hộ kinh doanh<sup>33</sup>
            </Checkbox>
            <Checkbox>
              Thành lập trên cơ sở chuyển đổi từ cơ sở bảo trợ xã hội/quỹ xã
              hội/quỹ từ thiện<sup>44</sup>
            </Checkbox>
          </div>
        </Col>
      </Row>

      <Row gutter={[16, 12]}>
        <Col span={24} align="left">
          <b>
            2. Tên công ty:
            <br />
          </b>
          <Typography.Paragraph>
            Tên công ty viết bằng tiếng Việt <i>(ghi bằng chữ in hoa)</i>: ………
            <br /> {/**TÊN CÔNG TY BẮT BUỘC IN HOA*/}
            Tên công ty viết bằng tiếng nước ngoài <i>(nếu có)</i>:………
            <br />
            Tên công ty viết tắt <i>(nếu có)</i>: ………
            <br />
          </Typography.Paragraph>

          {/** Note.... */}
          <Divider style={{ margin: "50px 0" }} />
          <Typography.Paragraph style={{ fontSize: "12px" }}>
            11: Trường hợp Tòa án hoặc Trọng tài chỉ định người thực hiện thủ
            tục đăng ký doanh nghiệp thì người được chỉ định kê khai thông tin
            vào phần này.
            <br />
            22 Trường hợp đăng ký chuyển đổi loại hình doanh nghiệp đồng thời
            đăng ký thay đổi người đại diện theo pháp luật thì Chủ tịch công
            ty/Chủ tịch Hội đồng thành viên của công ty sau chuyển đổi kê khai
            thông tin vào phần này.
            <br />
            33 , 4 Trường hợp đăng ký thành lập công ty TNHH một thành viên trên
            cơ sở chuyển đổi từ hộ kinh doanh/cơ sở bảo trợ xã hội/quỹ xã
            hội/quỹ từ thiện qua mạng thông tin điện tử thì người nộp hồ sơ scan
            Giấy chứng nhận đăng ký hộ kinh doanh/Giấy chứng nhận đăng ký thành
            lập (đối với cơ sở bảo trợ xã hội)/Giấy phép thành lập và công nhận
            điều lệ quỹ (đối với quỹ xã hội/quỹ từ thiện) trong hồ sơ đăng ký
            doanh nghiệp qua mạng thông tin điện tử và nộp trực tiếp bản chính
            Giấy này tới Phòng Đăng ký kinh doanh để được cấp Giấy chứng nhận
            đăng ký doanh nghiệp theo quy định tại Điều 27 và Điều 28 Nghị định
            số 01/2021/NĐ-CP ngày 04/01/2021 của Chính phủ về đăng ký doanh
            nghiệp.
          </Typography.Paragraph>
        </Col>
      </Row>

      <Divider className="hide_on_print">Trang 1</Divider>

      <Row gutter={[16, 12]}>
        <Col span={24} align="left">
          <Typography.Text strong>
            3. Địa chỉ trụ sở chính:
            <br />
          </Typography.Text>
          <Typography.Text>
            Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn: ………
            <br />
            Xã/Phường/Thị trấn: ………
            <br />
            Quận/Huyện/Thị xã/Thành phố thuộc tỉnh: ………
            <br />
            Tỉnh/Thành phố: ………
            <br />
            Điện thoại: 13 Fax <i>(nếu có)</i>: ………
            <br />
            Email <i>(nếu có)</i>: Website <i>(nếu có)</i>: ………
            <br />
          </Typography.Text>
          <Typography.Text>
            - Doanh nghiệp nằm trong (Đánh dấu X vào ô vuông tương ứng nếu doanh
            nghiệp đăng ký <br />
            địa chỉ trụ sở chính nằm trong khu công nghiệp/khu chế xuất/khu kinh
            tế/khu công nghệ cao):
          </Typography.Text>
          <div className="right_left">
            <Checkbox>Khu công nghiệp</Checkbox>
            <Checkbox>Khu chế xuất</Checkbox>
            <Checkbox>Khu kinh tế</Checkbox>
            <Checkbox>Khu công nghệ cao</Checkbox>
          </div>
          <div className="left_right">
            <Checkbox>
              Doanh nghiệp xã hội
              <i>(Đánh dấu X vào ô vuông nếu là doanh nghiệp xã hội) </i>
            </Checkbox>
            <Checkbox>
              Công ty chứng khoán/Công ty quản lý quỹ đầu tư chứng khoán/Công ty
              đầu tư chứng khoán:
              <i>
                (Đánh dấu X nếu là Công ty chứng khoán/Công ty quản lý quỹ đầu
                tư chứng khoán/Công ty đầu tư chứng khoán và kê khai thêm các
                thông tin sau đây)
              </i>
            </Checkbox>
          </div>

          <Typography.Text>
            Giấy phép thành lập và hoạt động số: …{" "}
            <Typography.Text italic>(nếu có)</Typography.Text> do Uỷ ban Chứng
            khoán Nhà nước cấp ngày: …./…./….. <br />
          </Typography.Text>
          <Typography.Text>
            - Doanh nghiệp có Giấy chứng nhận quyền sử dụng đất tại đảo và xã,
            phường, thị trấn biên giới; xã, phường, thị trấn ven biển; khu vực
            khác có ảnh hưởng đến quốc phòng, an ninh <sup>45 </sup> :
            <Row gutter={[16, 12]}>
              {" "}
              <Col span={12}>
                {" "}
                <Checkbox>Có</Checkbox>{" "}
              </Col>
              <Col span={12}>
                <Checkbox>Không</Checkbox>
              </Col>
            </Row>
          </Typography.Text>
        </Col>
      </Row>
      <Row gutter={[16, 12]}>
        <Col span={24} align="left">
          <Typography.Text strong>4. Ngành, nghề kinh doanh</Typography.Text>
          <Typography.Text italic>
            (ghi tên và mã theo ngành cấp 4 trong Hệ thống ngành kinh tế của
            Việt Nam):
          </Typography.Text>
          <br />
          <br />
          <Table size="small" dataSource={[{}]} pagination={false}>
            <Table.Column title="STT" render={(val, record, i) => "STT"} />
            <Table.Column
              title="Tên ngành"
              render={(val, record, i) => "STT"}
            />
            <Table.Column title="Mã ngành" render={(val, record, i) => "STT"} />
            <Table.Column
              title="Ngành, nghề kinh doanh chính (đánh dấu X để chọn một trong các ngành, nghề đã kê khai)"
              render={(val, record, i) => "STT"}
            />
          </Table>
        </Col>
      </Row>
      <Row gutter={[16, 12]}>
        <Col span={24} align="left">
          <Typography.Text strong>
            5. Chủ sở hữu:
            <br />
            <Typography.Text italic strong>
              a) Đối với chủ sở hữu là cá nhân:
              <br />
            </Typography.Text>
          </Typography.Text>

          <Typography.Text>
            - Thông tin về chủ sở hữu:
            <br />
            Họ tên chủ sở hữu{" "}
            <Typography.Text italic>(ghi bằng chữ in hoa)</Typography.Text>
            :.....{/**HỌ VÀ TÊN BẮT BUỘC IN HOA*/} Giới tính: <br />
            Sinh ngày:...... Dân tộc:......Quốc tịch: Việt Nam <br />
            Loại giấy tờ pháp lý của cá nhân: <br />
            <Row gutter={[16, 12]}>
              <Col span={12}>
                <Checkbox> Chứng minh nhân dân</Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox> Căn cước công dân</Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox> Hộ chiếu</Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox>
                  {" "}
                  Loại khác <i>(ghi rõ)</i>:……
                </Checkbox>
              </Col>
            </Row>
          </Typography.Text>

          <Typography.Text>
            Số giấy tờ pháp lý của cá nhân: …… <br />
            Ngày cấp: ….Nơi cấp: ……..Ngày hết hạn{" "}
            <Typography.Text italic>(nếu có)</Typography.Text>: <br />
            Địa chỉ thường trú: <br />
            Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn: <br />
            Xã/Phường/Thị trấn: <br />
            Quận/Huyện/Thị xã/Thành phố thuộc tỉnh: <br />
            Tỉnh/Thành phố: <br />
            Quốc gia: ... <br />
            Địa chỉ liên lạc: <br />
            Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn: <br />
            Xã/Phường/Thị trấn: <br />
            Quận/Huyện/Thị xã/Thành phố thuộc tỉnh: <br />
            Tỉnh/Thành phố: <br />
            Quốc gia: ...... <br />
            Điện thoại <Typography.Text italic>(nếu có)</Typography.Text>:
            ...... Email <Typography.Text italic>(nếu có) </Typography.Text>:
            ...... <br />- Thông tin về Giấy chứng nhận đăng ký đầu tư{" "}
            <Typography.Text italic>
              (chỉ kê khai nếu chủ sở hữu là nhà đầu tư nước ngoài)
            </Typography.Text>
            : <br />
            Mã số dự án: <br />
            Ngày cấp: .... / .... / .... Cơ quan cấp: <br />
          </Typography.Text>
          <Typography.Text italic strong>
            b) Đối với chủ sở hữu là tổ chức:
            <br />
          </Typography.Text>
          <Typography.Text>
            - Thông tin về chủ sở hữu:
            <br />
            Tên tổ chức{" "}
            <Typography.Text italic>(ghi bằng chữ in hoa)</Typography.Text>:
            <br /> {/**TÊN TỔ CHỨC BẮT BUỘC IN HOA*/}
            Mã số doanh nghiệp/Số Quyết định thành lập:
            <br />
            Ngày cấp: / / Nơi cấp: <br />
            Địa chỉ trụ sở chính: <br />
            Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn:
            <br />
            Xã/Phường/Thị trấn:
            <br />
            Quận/Huyện/Thị xã/Thành phố thuộc tỉnh:
            <br />
            Tỉnh/Thành phố:
            <br />
            Quốc gia: Việt Nam <br />
            Điện thoại <Typography.Text italic>(nếu có)</Typography.Text>: Fax{" "}
            <Typography.Text italic>(nếu có)</Typography.Text>: <br />
            Email <Typography.Text italic>(nếu có)</Typography.Text>: Website{" "}
            <Typography.Text italic>(nếu có)</Typography.Text>: <br />
            - Thông tin về người đại diện theo pháp luật/người đại diện theo uỷ
            quyền (kê khai theo Phụ lục I-10 ban hành kèm theo Thông tư số
            01/2021/TT-BKHĐT): Gửi kèm. <br />- Thông tin về Giấy chứng nhận
            đăng ký đầu tư{" "}
            <Typography.Text italic>
              (chỉ kê khai nếu chủ sở hữu là nhà đầu tư nước ngoài)
            </Typography.Text>
            : <br />
            Mã số dự án:……………………………………………………………… <br />
            Ngày cấp: / / Cơ quan cấp: <br />
            - Mô hình tổ chức công ty:
            <br />
            <Checkbox>
              {" "}
              Hội đồng thành viên, Giám đốc hoặc Tổng Giám đốc
            </Checkbox>
            <br />
            <Checkbox> Chủ tịch công ty, Giám đốc hoặc Tổng Giám đốc</Checkbox>
            <br />
          </Typography.Text>
        </Col>
      </Row>
      <Row gutter={[16, 12]}>
        <Col span={24} align="left">
          <Typography.Text strong>
            6. Vốn điều lệ:
            <br />
          </Typography.Text>
          <Typography.Text>
            Vốn điều lệ (bằng số; VNĐ): <br />
            Vốn điều lệ (bằng chữ; VNĐ): <br />
            Giá trị tương đương theo đơn vị tiền nước ngoài{" "}
            <Typography.Text italic>
              (nếu có, bằng số, loại ngoại tệ)
            </Typography.Text>
            : <br />
            Có hiển thị thông tin về giá trị tương đương theo đơn vị tiền tệ
            nước ngoài trên Giấy chứng nhận đăng ký doanh nghiệp hay không?
            {"     "}
            <Checkbox> Có</Checkbox>
            <Checkbox> Không</Checkbox>
            <br />
          </Typography.Text>
        </Col>
      </Row>
      <Row gutter={[16, 12]}>
        <Col span={24} align="left">
          <Typography.Text strong>
            7. Nguồn vốn điều lệ:
            <br />
          </Typography.Text>
          <br />
          <Table size="small" dataSource={Nguuonvondieule} pagination={false}>
            <Table.Column
              title="Loại nguồn vốn"
              render={(val, record, i) => record.Loainguonvon}
            />
            <Table.Column
              title="Số tiền (bằng số; VNĐ và giá trị tương đương theo đơn vị tiền nước ngoài, nếu có)"
              render={(val, record, i) => record.sotien}
            />
            <Table.Column
              title="Tỷ lệ (%)"
              render={(val, record, i) => record.tyle}
            />
          </Table>
        </Col>

        <Col span={24} align="left">
          <br />
          <Typography.Text strong>
            8. Tài sản góp vốn:
            <br />
          </Typography.Text>
          {/* <br /> */}
        </Col>
      </Row>
      <Row gutter={[16, 12]}>
        <Col span={24}>
          <Table size="small" dataSource={Taisangopvon} pagination={false}>
            <Table.Column title="STT" render={(val, record, i) => record.STT} />
            <Table.Column
              title="Tài sản góp vốn"
              render={(val, record, i) => record.Taisangopvon}
            />
            <Table.Column
              title="Giá trị vốn của từng tài sản trong vốn điều lệ (bằng số, VNĐ)"
              render={(val, record, i) => record.Giatri}
            />
            <Table.Column
              title="Tỷ lệ (%)"
              render={(val, record, i) => record.Tyle}
            />
          </Table>
        </Col>
      </Row>
      <Row gutter={[16, 12]}>
        <br />
        <Col span={24} align="left">
          <Typography.Text strong>
            9. Người đại diện theo pháp luật6: <br /> {/**số 6 font nhỏ */}
            {/** Đoạn text này nằm ở cuối trang để giải thích cho số 6. Trước đoạn này có divider. "6 Ghi thông tin của tất cả người đại diện theo pháp luật trong trường hợp công ty có nhiều hơn 01 người đại diện theo pháp luật."*/}
          </Typography.Text>
        </Col>
      </Row>
      <Row gutter={[16, 12]}>
        <Col span={24} align="left">
          <Typography.Paragraph>
            Họ và tên <i>(ghi bằng chữ in hoa)</i>: Giới tính:
            <br /> {/**HỌ VÀ TÊN BẮT BUỘC IN HOA*/}
            Chức danh:
            <br />
            Sinh ngày: / / Dân tộc: Quốc tịch:
            <br />
            Loại giấy tờ pháp lý của cá nhân:
            <br />
            <Checkbox> Chứng minh nhân dân</Checkbox>
            <Checkbox> Căn cước công dân</Checkbox>
            <br />
            <Checkbox> Hộ chiếu</Checkbox>
            <Checkbox>
              {" "}
              Loại khác <o>(ghi rõ)</o>:……
            </Checkbox>
            <br />
            Số giấy tờ pháp lý của cá nhân: ………………………………………...
            <br />
            Ngày cấp: …./…./….Nơi cấp: ………..Ngày hết hạn <i>(nếu có)</i>: …/…/…
            <br />
            Địa chỉ thường trú:
            <br />
            Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn:
            <br />
            Xã/Phường/Thị trấn:
            <br />
            Quận/Huyện/Thị xã/Thành phố thuộc tỉnh:
            <br />
            Tỉnh/Thành phố:
            <br />
            Quốc gia:
            <br />
            Địa chỉ liên lạc:
            <br />
            Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn:
            <br />
            Xã/Phường/Thị trấn:
            <br />
            Quận/Huyện/Thị xã/Thành phố thuộc tỉnh:
            <br />
            Tỉnh/Thành phố:
            <br />
            Quốc gia: Việt Nam <br />
            Điện thoại <i>(nếu có)</i>:....Email <i>(nếu có)</i>: <br />
          </Typography.Paragraph>
        </Col>
      </Row>
      <Row gutter={[16, 12]}>
        <Col span={24} align="left">
          <Typography.Text strong>
            10. Thông tin đăng ký thuế: <br />{" "}
            {/**Đoạn này nằm cuối chân trang, giải thích cho hàng 10.4 trong bảng 10. Trước đoạn này có divider. "7 Trường hợp doanh nghiệp được cấp Giấy chứng nhận đăng ký doanh nghiệp sau ngày bắt đầu hoạt động đã kê khai thì ngày bắt đầu hoạt động là ngày doanh nghiệp được cấp Giấy chứng nhận đăng ký doanh nghiệp."*/}
          </Typography.Text>
          <br />
          <Table
            size="small"
            dataSource={Thongtindangkythue}
            pagination={false}
          >
            <Table.Column title="STT" render={(val, record, i) => record.STT} />
            <Table.Column
              title="Các chỉ tiêu thông tin đăng ký thuế"
              render={(val, record, i) => record.Cacchitieu}
            />
          </Table>
        </Col>
      </Row>
      <Row gutter={[16, 12]}>
        <Col span={24} align="left">
          <Typography.Text strong>
            11. Đăng ký sử dụng hóa đơn10: <br />
          </Typography.Text>
          <Typography.Paragraph>
            <Checkbox> Tự in hóa đơn</Checkbox>
            <Checkbox> Đặt in hóa đơn</Checkbox>
            <br />
            <Checkbox> Sử dụng hóa đơn điện tử</Checkbox>
            <Checkbox> Mua hóa đơn của cơ quan thuế</Checkbox>
            <br />
          </Typography.Paragraph>
        </Col>
      </Row>
      <Row gutter={[16, 12]}>
        <Col span={24} align="left">
          <Typography.Text strong>
            12. Thông tin về việc đóng bảo hiểm xã hội11: <br />
          </Typography.Text>
          <Typography.Paragraph>
            Phương thức đóng bảo hiểm xã hội <i>(chọn 1 trong 3 phương thức)</i>
            :<br />
            <Checkbox> Hàng tháng</Checkbox>
            <Checkbox> 03 tháng một lần</Checkbox>
            <Checkbox> 06 tháng một lần</Checkbox>
            <br />
          </Typography.Paragraph>
          <br />
          <Typography.Text strong>
            Lưu ý: <br />
          </Typography.Text>
          <Typography.Paragraph>
            - Doanh nghiệp đăng ký ngành, nghề kinh doanh chính là nông nghiệp,
            lâm nghiệp, ngư nghiệp, diêm nghiệp và trả lương theo sản phẩm, theo
            khoán: có thể lựa chọn 1 trong 3 phương thức đóng bảo hiểm xã hội:
            hàng tháng, 03 tháng một lần, 06 tháng một lần.
            <br />
            - Doanh nghiệp đăng ký ngành, nghề kinh doanh chính khác: đánh dấu
            vào phương thức đóng bảo hiểm xã hội hàng tháng.
            <br />
          </Typography.Paragraph>
          {/** divide */}
          <Typography.Paragraph>
            {" "}
            {/** đoạn text này font nhỏ, in nghiêng, đặt ở chân trang, xem file word trang 7 (Phụ lục I-2) */}
            8 - Trường hợp niên độ kế toán theo năm dương lịch thì ghi từ ngày
            01/01 đến ngày 31/12.
            <br />
            - Trường hợp niên độ kế toán theo năm tài chính khác năm dương lịch
            thì ghi ngày, tháng bắt đầu niên độ kế toán là ngày đầu tiên của
            quý; ngày, tháng kết thúc niên độ kế toán là ngày cuối cùng của quý.
            <br />
            - Tổng thời gian từ ngày bắt đầu đến ngày kết thúc niên độ kế toán
            phải đủ 12 tháng hoặc 4 quý liên tiếp.
            <br />
            9 Chỉ kê khai trong trường hợp thành lập mới. Doanh nghiệp căn cứ
            vào quy định của pháp luật về thuế giá trị gia tăng và dự kiến hoạt
            động kinh doanh của doanh nghiệp để xác định 01 trong 04 phương pháp
            tính thuế giá trị gia tăng tại chỉ tiêu này.
            <br />
            10 Doanh nghiệp có trách nhiệm đảm bảo các điều kiện về việc sử dụng
            hóa đơn tự in, đặt in, hóa đơn điện tử, mua hóa đơn của cơ quan thuế
            theo quy định của pháp luật. Không kê khai trong trường hợp thành
            lập doanh nghiệp trên cơ sở chuyển đổi loại hình doanh nghiệp.
            <br />
            11 Không kê khai trong trường hợp thành lập doanh nghiệp trên cơ sở
            chuyển đổi loại hình doanh nghiệp.
            <br />
          </Typography.Paragraph>
        </Col>
      </Row>
      <Row gutter={[16, 12]}>
        <Col span={24} align="left">
          <Typography.Text strong>
            13. Thông tin về các doanh nghiệp bị chia, bị tách, bị hợp nhất,
            được chuyển đổi
          </Typography.Text>
          <i>
            (chỉ kê khai trong trường hợp thành lập công ty trên cơ sở chia,
            tách, hợp nhất, chuyển đổi loại hình doanh nghiệp):
            <br />
          </i>
          <Typography.Paragraph>
            Tên doanh nghiệp <i>(ghi bằng chữ in hoa)</i>:<br />
            {/**TÊN DOANH NGHIỆP BẮT BUỘC IN HOA*/}
            Mã số doanh nghiệp/Mã số thuế:
            <br />
            Số Giấy chứng nhận đăng ký kinh doanh
            <i>(chỉ kê khai nếu không có mã số doanh nghiệp/mã số thuế)</i>:
            ……………… Ngày cấp …/…/…… Nơi cấp: ……………….
            <br />
            Đề nghị Phòng Đăng ký kinh doanh thực hiện chấm dứt tồn tại đối với
            doanh nghiệp bị chia, bị hợp nhất và các chi nhánh/văn phòng đại
            diện/địa điểm kinh doanh của doanh nghiệp bị chia, bị hợp nhất.
            <br />
          </Typography.Paragraph>
        </Col>
      </Row>
      <Row gutter={[16, 12]}>
        <Col span={24} align="left">
          <Typography.Text strong>
            14. Thông tin về hộ kinh doanh được chuyển đổi
          </Typography.Text>
          <i>
            (chỉ kê khai trong trường hợp thành lập doanh nghiệp trên cơ sở
            chuyển đổi từ hộ kinh doanh):
            <br />
          </i>
          <Typography.Paragraph>
            Tên hộ kinh doanh <i>(ghi bằng chữ in hoa)</i>:{" "}
            {/** Field nhập vào phải in hoa */}
            <br />
            Số Giấy chứng nhận đăng ký hộ kinh doanh:
            <br />
            Ngày cấp: / / Nơi cấp:
            <br />
            Mã số thuế của hộ kinh doanh <i>(chỉ kê khai MST 10 số)</i>:<br />
            Địa chỉ trụ sở hộ kinh doanh:
            <br />
            Tên chủ hộ kinh doanh:
            <br />
            Loại giấy tờ pháp lý của cá nhân (kê khai theo giấy tờ pháp lý của
            cá nhân được ghi trên Giấy chứng nhận đăng ký thuế của hộ kinh
            doanh):
            <br />
            <Checkbox> Chứng minh nhân dân</Checkbox>
            <Checkbox> Căn cước công dân</Checkbox>
            <br />
            <Checkbox> Hộ chiếu</Checkbox>
            <Checkbox>
              {" "}
              Loại khác <i>(ghi rõ)</i>:……
            </Checkbox>
            <br />
            Số giấy tờ pháp lý của cá nhân (kê khai theo giấy tờ pháp lý của cá
            nhân được ghi trên Giấy chứng nhận đăng ký thuế của hộ kinh doanh):
            <br />
            Ngày cấp: …./…./….Nơi cấp: ………..Ngày hết hạn <i>(nếu có)</i>: …/…/…
            <br />
          </Typography.Paragraph>
        </Col>
      </Row>
      <Row gutter={[16, 12]}>
        <Col span={24} align="left">
          <Typography.Text strong>
            15. Thông tin về cơ sở bảo trợ xã hội/quỹ xã hội/quỹ từ thiện được
            chuyển đổi
          </Typography.Text>
          <i>
            (chỉ kê khai trong trường hợp thành lập doanh nghiệp xã hội trên cơ
            sở chuyển đổi từ cơ sở bảo trợ xã hội/quỹ xã hội/quỹ từ thiện):
            <br />
          </i>
          <Typography.Paragraph>
            Tên cơ sở bảo trợ xã hội/quỹ xã hội/quỹ từ thiện{" "}
            <i>(ghi bằng chữ in hoa)</i>:<br />
            {/**CHỖ NÀY BẮT BUỘC IN HOA*/}
            Số Giấy chứng nhận đăng ký thành lập (Đối với cơ sở bảo trợ xã
            hội)/Số Giấy phép thành lập và công nhận điều lệ quỹ (Đối với quỹ xã
            hội/quỹ từ thiện): ……… Ngày cấp: … /… /…… Nơi cấp:
            <br />
            Mã số thuế của cơ sở bảo trợ xã hội/quỹ xã hội/quỹ từ thiện{" "}
            <i>(chỉ kê khai MST 10 số)</i>:<br />
            Địa chỉ trụ sở chính:
            <br />
            Tên người đại diện cơ sở bảo trợ xã hội/quỹ xã hội/quỹ từ thiện:
            <br />
            Loại giấy tờ pháp lý của cá nhân (kê khai theo giấy tờ pháp lý của
            cá nhân được ghi trên Giấy chứng nhận đăng ký thuế của cơ sở bảo trợ
            xã hội/quỹ xã hội/quỹ từ thiện):
            <br />
            <Checkbox> Chứng minh nhân dân</Checkbox>
            <Checkbox> Căn cước công dân</Checkbox>
            <br />
            <Checkbox> Hộ chiếu</Checkbox>
            <Checkbox>
              {" "}
              Loại khác <i>(ghi rõ)</i>:……
            </Checkbox>
            <br />
            Số giấy tờ pháp lý của cá nhân (kê khai theo giấy tờ pháp lý của cá
            nhân được ghi trên Giấy chứng nhận đăng ký thuế của cơ sở bảo trợ xã
            hội/quỹ xã hội/quỹ từ thiện):
            <br />
            Ngày cấp: …./…./….Nơi cấp: ………..Ngày hết hạn <i>(nếu có)</i>: …/…/…
            <br />
            Trường hợp hồ sơ đăng ký doanh nghiệp hợp lệ, đề nghị Quý Phòng đăng
            công bố nội dung đăng ký doanh nghiệp trên Cổng thông tin quốc gia
            về đăng ký doanh nghiệp.
            <br />
            Tôi cam kết:
            <br />
            - Là người có đầy đủ quyền và nghĩa vụ thực hiện thủ tục đăng ký
            doanh nghiệp theo quy định của pháp luật và Điều lệ công ty.
            <br />
            - Trụ sở chính thuộc quyền sở hữu/quyền sử dụng hợp pháp của công ty
            và được sử dụng đúng mục đích theo quy định của pháp luật;
            <br />
            - Sử dụng hóa đơn tự in, đặt in, hóa đơn điện tử, mua hóa đơn của cơ
            quan thuế theo đúng quy định của pháp luật12;
            <br />
            - Chịu trách nhiệm trước pháp luật về tính hợp pháp, chính xác và
            trung thực của nội dung đăng ký doanh nghiệp trên.
            <br />
          </Typography.Paragraph>
        </Col>
      </Row>
      <Row gutter={[16, 12]}>
        {/** Option + Shift + F -> Format lai page */}
        <Col span={24}>
          <Row gutter={[16, 12]}>
            <Col span={12} align="center">
              <Typography.Text>
                <Typography.Text strong></Typography.Text> <br />
                <Typography.Text italic></Typography.Text>
              </Typography.Text>
            </Col>
            <Col span={12} align="center">
              <Typography.Paragraph>
                <b>
                  NGƯỜI ĐẠI DIỆN THEO PHÁP LUẬT/ CHỦ TỊCH CÔNG TY/CHỦ TỊCH HỘI
                  ĐỒNG THÀNH VIÊN CỦA CÔNG TY
                </b>{" "}
                <br />
                <i>(ký, họ tên)</i>
              </Typography.Paragraph>
            </Col>
          </Row>
        </Col>
      </Row>
      <br />
      <br />
      <br />
      <br />
      <br />

      <Row style={{ position: "relative" }}>
        <Col span={24} align="left">
          {/** divide */}
          <Typography.Paragraph style={{ fontSize: "12px" }}>
            {" "}
            {/** đoạn text này font nhỏ, in nghiêng, đặt ở chân trang, xem file word trang cuối (Phụ lục I-2) */}
            12 Không kê khai trong trường hợp thành lập doanh nghiệp trên cơ sở
            chuyển đổi loại hình doanh nghiệp.
            <br />
            13 - Người đại diện theo pháp luật của doanh nghiệp ký trực tiếp vào
            phần này.
            <br />
            - Trường hợp đăng ký chuyển đổi loại hình doanh nghiệp đồng thời
            đăng ký thay đổi người đại diện theo pháp luật thì Chủ tịch công
            ty/Chủ tịch Hội đồng thành viên của công ty sau chuyển đổi ký trực
            tiếp vào phần này.
            <br />
            - Trường hợp Tòa án hoặc Trọng tài chỉ định người thực hiện thủ tục
            đăng ký doanh nghiệp thì người được chỉ định ký trực tiếp vào phần
            này.
            <br />
          </Typography.Paragraph>
        </Col>
      </Row>
      {/* </Card>
      </Space> */}
    </div>
  );
});

export default File2;
