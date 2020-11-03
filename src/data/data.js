import { defaultWorkflows } from './mockData';

export const getWfs = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(defaultWorkflows);
        }, 1000);
    })
}