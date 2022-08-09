import React from 'react';
import { render, screen, fireEvent, waitFor, getByText, getByLabelText, getByTestId, queryByTestId } from '@testing-library/react';

import { download } from '../../../data/download';
import DownloadTable from '..';

window.alert = jest.fn();

test('render downloadTable', () => {
    render(<DownloadTable download={download}/>);
});

test('check table visibility', () => {
    render(<DownloadTable download={download} />);
    expect(screen.getByRole('table')).toBeVisible();
});

test('check if table contains headers', () => {
    render(<DownloadTable download={download} />);
    expect(screen.getByRole('table')).toContainHTML("Name");
    expect(screen.getByRole('table')).toContainHTML("Device");
    expect(screen.getByRole('table')).toContainHTML("Path");
    expect(screen.getByRole('table')).toContainHTML("Status");
});

test('DOM validation for Download selected', () => {
    render(<DownloadTable download={download} />);
    const downloadElement = screen.getByText(/Download Selected/);
    expect(downloadElement).toBeInTheDocument();
});

test('DOM validation for Select All', () => {
    render(<DownloadTable download={download} />);
    const selectAllElement = screen.getByText(/Selected /);
    expect(selectAllElement).toBeInTheDocument();
});

test('should render html table and checkbox', () => {
    render(<DownloadTable download={download} />);
    const downloadTable = screen.getByTestId('downloadApp');
    const checkboxElem = screen.getByTestId('checkAll');
    expect(downloadTable).toBeInTheDocument();
    expect(checkboxElem).toBeInTheDocument();
});



