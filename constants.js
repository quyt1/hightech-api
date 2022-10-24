const categoryType = {
    CPU: 1,
    MAINBOARD: 2,
    RAM: 3,
    HDD: 4,
    SSD: 5,
    VGA: 6,
    POWER: 7,
    CASE: 8,
    COOLER: 9,
    MONITOR: 10,
    KEYBOARD: 11,
    MOUSE: 12,
    HEADPHONE: 13
}

const CustomLabelsPagination = {
    totalDocs: 'total_rows',
    docs: 'data',
    limit: 'per_page',
    page: 'current_page',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'total_pages',
    pagingCounter: 'slNo',
    meta: 'pagination',
};

const userType = {
    SuperAdmin: 'superadmin',
    Admin: 'admin',
    CUSTOMER: 'customer'
}

const orderStatus = {
    NotProcessed: 'Not Processed',
    Processing: 'Processing',
    Shipping: 'Shipping',
    Completed: 'Completed',
    Cancelled: 'Cancelled'
}

module.exports ={
    CATEGORY_TYPE: categoryType,
    CUSTOM_LABELS_PAGINATION: CustomLabelsPagination,
    USER_TYPE: userType,
    ORDER_STATUS: orderStatus
}