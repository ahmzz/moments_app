export default {
    name:'moment',
    title:'Moment',
    type:'document',
    fields:[
        {
            name:'title',
            title:'Title',
            type:'string'
        },
        {
            name:'about',
            title:'About',
            type:'string'
        },
        {
            name:'destination',
            title:'Destination',
            type:'url'
        },
        {
            name:'category',
            title:'Category',
            type:'string',
            options:{
                hotspot:'true'
            }
        },
        {
            name:'userId',
            title:'UserID',
            type:'string'
        },
        {
            name:'postedBy',
            title:'PostedBy',
            type:'postedBy'
        },
        {
            name:'save',
            title:'Save',
            type:'array',
            of:[{type:'save'}]
        },
        {
            name:'comments',
            title:'Comments',
            type:'array',
            of:[{type:'comment'}]
        }
    ]
}