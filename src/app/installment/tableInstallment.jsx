const TableInstallment = () => {
  const paymentData = [
    {
      category: "Giá mua trả góp",
      "3months": "3.040.000₫",
      "6months": "3.040.000₫",
      "9months": "3.040.000₫",
      "12months": "3.040.000₫",
    },
    {
      category: "Góp mỗi tháng",
      "3months": "1.013.334₫",
      "6months": "506.667₫",
      "9months": "353.485₫",
      "12months": "268.280₫",
    },
    {
      category: "Tổng tiền trả góp",
      "3months": "3.040.000₫",
      "6months": "3.040.000₫",
      "9months": "3.181.360₫",
      "12months": "3.219.360₫",
    },
    {
      category: "Chênh lệch với mua trả thẳng",
      "3months": "0₫",
      "6months": "0₫",
      "9months": "141.360₫",
      "12months": "179.360₫",
    },
  ];

  return (
    <table className="table_payment table table-striped mb-0">
      <tbody>
        <tr>
          <td className="title w_220px">Số tháng trả góp</td>
          <td className="title_month">3 tháng</td>
          <td className="title_month">6 tháng</td>
          <td className="title_month">9 tháng</td>
          <td className="title_month">12 tháng</td>
        </tr>
        {paymentData.map((row, index) => (
          <tr key={index}>
            <td className="title w_220px">{row.category}</td>
            <td className="value">{row["3months"]}</td>
            <td className="value">{row["6months"]}</td>
            <td className="value">{row["9months"]}</td>
            <td className="value">{row["12months"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableInstallment;
