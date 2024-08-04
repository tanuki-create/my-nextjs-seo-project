import React from 'react';

interface ServiceData {
  name: string;
  pricing: string;
  price: string;
  notes: string;
}

interface ComparisonTableProps {
  data: ServiceData[];
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ data }) => {
  return (
    <table className="comparison-table">
      <thead>
        <tr>
          <th>サービス名</th>
          <th>課金形態</th>
          <th>価格</th>
          <th>備考</th>
        </tr>
      </thead>
      <tbody>
        {data.map((service, index) => (
          <tr key={index}>
            <td>{service.name}</td>
            <td>{service.pricing}</td>
            <td>{service.price}</td>
            <td dangerouslySetInnerHTML={{ __html: service.notes }} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ComparisonTable;
