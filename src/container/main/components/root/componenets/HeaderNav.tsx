import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

interface CustomLinkProps {
  to: string; // Путь для ссылки
  children: React.ReactNode; // Текст или содержимое ссылки
  hoverColor?: string; // Цвет фона при наведении
  hoverTextColor?: string; // Цвет текста при наведении
  style?: CSSProperties; // Дополнительные стили
}

export const HeaderNav: React.FC<CustomLinkProps> = ({
  to,
  children,
  hoverColor = '#6CBF30',
  hoverTextColor = 'white',
  style
}) => {
  // Базовые стили
  const baseStyle: CSSProperties = {
    color: '#6CBF30',
    textDecoration: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    ...style // Пользовательские стили
  };

  // Хук для отслеживания состояния "наведено"
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link
      to={to}
      style={{
        ...baseStyle,
        color: isHovered ? hoverTextColor : baseStyle.color,
        backgroundColor: isHovered ? hoverColor : 'transparent'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
};
