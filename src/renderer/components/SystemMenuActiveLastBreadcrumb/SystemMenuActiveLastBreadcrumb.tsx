import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

export default function SystemMenuActiveLastBreadcrumb({
  navItem,
}: {
  navItem: string[];
}) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {navItem.map((navItemString, navItemIdx) => {
          if (navItemIdx !== navItem.length - 1) {
            return (
              <Link
                underline="hover"
                color="inherit"
                href="/"
                key={navItemString}
              >
                {navItemString}
              </Link>
            );
          }
          return (
            <Link
              underline="hover"
              color="text.primary"
              href="/last-link"
              aria-current="page"
              key={navItemString}
            >
              {navItemString}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
