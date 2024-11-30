import React from 'react';
import { Link } from 'react-router-dom';
import { getNavigationsValue } from '@brojs/cli';

const contacts = [
  { id: 1, title: 'VK', description: 'ВКонтакте', link: 'https://vk.com' },
  { id: 2, title: 'VK', description: 'Группа ВКонтакте', link: 'https://vk.com' }
];

const Footer = (): React.ReactElement => {
  const contactLinks = contacts.map((contact) => (
    <li>
      <a href={contact.link}>
        <p>
          <strong>{contact.title}: </strong>
          {contact.description}
        </p>
      </a>
    </li>
  ));

  return (
    <footer>
      <div className="container">
        <div className="left-footer-z">
          <div className="left-footer">
            <ul>
              <li>
                <p>Возникли проблемы с сайтом?</p>
              </li>
              <li>
                <Link to={getNavigationsValue('sandbox.main')}>Написать в поддержку</Link>
              </li>
            </ul>
          </div>
          <div className="right-footer">
            <ul>
              <li>
                <p>Контакты</p>
              </li>
              {contactLinks}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
