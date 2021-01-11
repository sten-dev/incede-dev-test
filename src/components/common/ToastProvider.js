import * as React from 'react';

const ToastContext = React.createContext({});

export class ToastProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            options: {},
            color: '',
            message: '',
            show: (message, type, options) => {
                let color;
                switch (type) {
                    case 'success':
                        color = '#4caf50';
                        break;
                    case 'warn':
                        color = '#ff9800';
                        break;
                    case 'error':
                        color = '#f44336';
                        break;
                    default:
                        color = '#2196f3';
                        break;
                }
                this.setState({
                    open: !this.state.open,
                    color: color,
                    message,
                    options
                });
                setTimeout(() => {
                    this.setState({
                        open: false
                    });
                }, 3000);
            }
        };
    }
    handleClose = () => {
        this.setState({
            open: false
        });
    };
    render() {
        return (
            <ToastContext.Provider
                value={{
                    ...this.state
                }}>
                <>
                    {this.state.open && (
                        <div className='position-relative'>
                            <div
                                className='d-flex align-items-center position-absolute custom-toast py-2 px-3'
                                style={{ backgroundColor: this.state.color }}>
                                <div className='flex-grow-1'>
                                    <h6 className='text-white m-0 p-2'>{this.state.message}</h6>
                                </div>
                                <div
                                    className='p-2 pointer'
                                    onClick={() => {
                                        this.handleClose();
                                    }}>
                                    <h4 className='text-white'>&times;</h4>
                                </div>
                            </div>
                        </div>
                    )}
                    {this.props.children}
                </>
            </ToastContext.Provider>
        );
    }
}

export const withToastContext = ChildComponent => props => (
    <ToastContext.Consumer>
        {context => <ChildComponent {...props} toast={context} />}
    </ToastContext.Consumer>
);
