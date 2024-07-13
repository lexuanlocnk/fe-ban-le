"use client";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

const PostCategory = () => {
  const [checkShowMorePost, setCheckShowMorePost] = useState(false);

  const dataCKEDITOR = decodeURIComponent(
    '<p>Trong su\u1ed1t ch\u1eb7ng \u0111\u01b0\u1eddng h\u01a1n 40 n\u0103m k\u1ec3 t\u1eeb khi \u0111\u01b0\u1ee3c ra m\u1eaft l\u1ea7n \u0111\u1ea7u b\u1edfi Osborne Computer<strong>, </strong><a href="https://phongvu.vn/c/laptop#laptop"><strong>laptop</strong></a><strong> </strong>\u0111\u00e3 kh\u00f4ng ng\u1eebng c\u1ea3i ti\u1ebfn c\u1ea3 v\u1ec1 m\u1eabu m\u00e3 l\u1eabn c\u00f4ng ngh\u1ec7<strong>.&nbsp;</strong>V\u1edbi ch\u1ee9c n\u0103ng kh\u00f4ng kh\u00e1c g\u00ec m\u00e1y t\u00ednh \u0111\u1ec3 b\u00e0n, l\u1ea1i c\u00f3 th\u00eam s\u1ef1 thu\u1eadn ti\u1ec7n v\u00e0 nh\u1ecf g\u1ecdn, laptop ng\u00e0y c\u00e0ng \u0111\u01b0\u1ee3c \u0111\u00f4ng \u0111\u1ea3o ng\u01b0\u1eddi d\u00f9ng ch\u1ecdn mua.</p><figure class="image"><img style="aspect-ratio:1440/800;" src="https://storage.googleapis.com/teko-gae.appspot.com/media/image/2023/6/13/5e39c9d3-d052-4f3a-a1c8-cac737d5e947/image.png" alt="Laptop li\u1ec7u c\u00f3 ph\u1ea3i l\u00e0 c\u00f4ng c\u1ee5 h\u1ed7 tr\u1ee3 \u0111\u1eafc l\u1ef1c cho nhi\u1ec1u ng\u01b0\u1eddi d\u00f9ng kh\u00f4ng?" width="1440" height="800"><figcaption>Laptop li\u1ec7 c\u00f3 ph\u1ea3i l\u00e0 c\u00f4ng c\u1ee5 h\u1ed7 tr\u1ee3 \u0111\u1eafc l\u1ef1c cho nhi\u1ec1u ng\u01b0\u1eddi d\u00f9ng kh\u00f4ng</figcaption></figure><h2><strong>C\u00e1c th\u00f4ng s\u1ed1 k\u1ef9 thu\u1eadt c\u1ea7n quan t\u00e2m c\u1ee7a laptop</strong></h2><figure class="table"><table><tbody><tr><td>Th\u00f4ng s\u1ed1</td><td>Gi\u1ea3i th\u00edch</td></tr><tr><td>M\u00f4 h\u00ecnh (Model)</td><td>Vostro 3400, Latitude 5420, v.v.</td></tr><tr><td>H\u00e3ng s\u1ea3n xu\u1ea5t</td><td>Dell, Asus, Lenovo, Acer, HP, v.v.</td></tr><tr><td>H\u1ec7 \u0111i\u1ec1u h\u00e0nh</td><td>Windows, MacOS, Linux, v.v.</td></tr><tr><td>CPU</td><td>Intel Core i5, Intel Core i7, AMD Ryzen 3, AMD Ryzen 5, v.v.</td></tr><tr><td>RAM</td><td>4GB, 8GB, 12GB, 16GB, v.v.</td></tr><tr><td>M\u00e0n h\u00ecnh</td><td><a href="https://phongvu.vn/c/laptop-13-inch#laptop-13-inch">Laptop 13 inch</a>, <a href="https://phongvu.vn/c/laptop-14-inch#laptop-14-inch">Laptop 14 inch</a>, <a href="https://phongvu.vn/c/laptop-15-6-inch#laptop-15-6-inch">Laptop 15.6 inch</a>,...</td></tr><tr><td>\u0110\u1ed9 ph\u00e2n gi\u1ea3i</td><td>2K, 4K, HD, Full HD, Full HD+, v.v.</td></tr><tr><td>\u0110\u1ed3 h\u1ecda&nbsp;</td><td>RTX, Nvidia, MSI, AMD, v.v.</td></tr><tr><td>\u1ed4 c\u1ee9ng</td><td>HDD ho\u1eb7c SSD</td></tr><tr><td>C\u1ed5ng k\u1ebft n\u1ed1i</td><td>USB Type-C, USB Type-A, HDMI, USB 3.0, Thunderbolt 3, v.v</td></tr><tr><td>K\u1ebft n\u1ed1i kh\u00f4ng d\u00e2y</td><td>Wi-Fi, NFC, Bluetooth, v.v.</td></tr><tr><td>Camera</td><td>Camera 720p HD, Camera Full HD 1080p, Camera Full HD 1080p, v.v.</td></tr><tr><td>\u00c2m thanh</td><td>Dolby Atmos, Sonic Master, Wave MaxxAudio, v.v.</td></tr><tr><td>Pin</td><td>1-cell, 2-cells, 3-cells, v.v.)</td></tr></tbody></table></figure>'
  );
  return (
    <div>
      <div
        className={`${
          checkShowMorePost ? "h-100" : ""
        } box_post_category bg-white     `}
      >
        <div dangerouslySetInnerHTML={{ __html: dataCKEDITOR }}></div>
      </div>
      <div className="btn_show_more_post_category bg-white     mt-1   ">
        <span
          onClick={() => setCheckShowMorePost(!checkShowMorePost)}
          className={`text_show_more_post_category`}
        >
          {!checkShowMorePost ? " Xem thêm nội dung " : "Thu gọn nội dung"}
        </span>
        <FaChevronRight style={{ fontSize: "13px" }} />
      </div>
    </div>
  );
};

export default PostCategory;
