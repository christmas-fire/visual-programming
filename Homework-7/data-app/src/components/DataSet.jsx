import React, { useState } from 'react';
import '../App.css'; // Импортируем стили

const DataSet = ({ headers, data, renderHeader, renderRow }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedCells, setSelectedCells] = useState({});

  // Обработчик клика по строке
  const handleRowClick = (index, event) => {
    if (event.ctrlKey) {
      // Если нажата клавиша Ctrl, добавляем или убираем строку из выделенных
      setSelectedRows((prev) =>
        prev.includes(index)
          ? prev.filter((rowIndex) => rowIndex !== index) // Убираем выделение
          : [...prev, index] // Добавляем выделение
      );
    } else {
      // Иначе выделяем только текущую строку, если она еще не выделена
      setSelectedRows((prev) =>
        prev.includes(index) ? [] : [index]
      );
    }
  };

  // Обработчик клика по ячейке
  const handleCellClick = (rowIndex, colKey, event) => {
    event.stopPropagation(); // Предотвращаем всплытие события до строки
    if (event.ctrlKey) {
      // Если нажата клавиша Ctrl, убираем выделение ячейки
      setSelectedCells((prev) => {
        const key = `${rowIndex}-${colKey}`;
        const updatedCells = { ...prev };
        delete updatedCells[key]; // Удаляем выделение для конкретной ячейки
        return updatedCells;
      });
    } else {
      // Иначе переключаем выделение ячейки
      setSelectedCells((prev) => {
        const key = `${rowIndex}-${colKey}`;
        return {
          ...prev,
          [key]: !prev[key], // Переключаем состояние выделения ячейки
        };
      });
    }
  };

  return (
    <table className="data-table">
      {/* Заголовки таблицы */}
      <thead>
        <tr>
          <th className="selection-header"></th>
          {headers.map((header, index) => (
            <th key={index}>
              {renderHeader ? renderHeader(header) : header.label}
            </th>
          ))}
        </tr>
      </thead>

      {/* Тело таблицы */}
      <tbody>
        {data.map((item, rowIndex) => (
          <tr
            key={rowIndex}
            onClick={(e) => handleRowClick(rowIndex, e)}
            className={selectedRows.includes(rowIndex) ? 'selected' : ''}
          >
            {/* Левая область для выделения строки */}
            <td className="selection-area">{rowIndex + 1}</td>
            {/* Остальные ячейки строки */}
            {headers.map((header, colIndex) => {
              const cellKey = `${rowIndex}-${header.key}`;
              const isCellSelected = selectedCells[cellKey];
              return (
                <td
                  key={colIndex}
                  onClick={(e) => handleCellClick(rowIndex, header.key, e)}
                  className={isCellSelected ? 'cell-selected' : ''}
                >
                  {renderRow ? renderRow(item, header) : item[header.key]}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataSet;
