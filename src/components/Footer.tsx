import { Link } from 'react-router-dom';
import { app_metadata, footerAnchors } from '../shared/data';
import { _footer as Container } from '../styles/modules/_footer';

export default function Footer() {
  return (
    <Container>
      <nav>
        {footerAnchors.map((item, index) => (
          <Link key={index.toString()} to={item.anchor}>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <p className='copyright-sentence'>&copy; {app_metadata.copyright}</p>
    </Container>
  );
}
