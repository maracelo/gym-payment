function planValidator(plan: string): boolean{
    const planVals = ['normal', 'vip'];

    return planVals.includes(plan);
}

export default planValidator;