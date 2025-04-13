```[[
  {
    $match: {
      tags : "javascript",
      isActive : true
    }
  },
  {
    $project: {
      name: 1,
      age : 1
    }
  }
]]
```

### how many people have registered ? 
```
   [
 {
   $sort: {
     registered: -1
   }
 },
  {
    $project: {
      name : 1,
      favoriteFruit : 1
    }
  }
]

```

### categorize on basis on favorate fruit

```
[
  {
    $group: {
      _id: "$favoriteFruit",
      users : {$push : "$name"} // new array is created
    },
  }
]

```

```
[
  {
    $group: {
      _id: "$favoriteFruit",
      users : {$push : "$name"}
    },
  },
  {
    $addFields: {
      countUsers: {
        $size : "$users"
      }
    }
  },
  {
    $sort: {
      "countUsers": -1
    }
  }
]

```
### how many users have developer as their first tag ? 

```
[
  {
    "$match": {
      "tags.0": "developer"
    }
  }
]

```

```
[
  {
    "$match": {
      "tags.0": "developer"
    }
  },
  {
    $count: 'First Tag as Developer'
  }
]
```

### Find users with developer and mongodb as tag

```
[
  {
    $match: {
      "tags" : {$all : ["developer","mongodb"]}
    }
  }
]
```

### List all companies listed in USA with their user count 

```
[
  {
    $match: {
      "company.location.country" : "USA"
    }
  },
  {
    $count: 'No of Companies in USA'
  }
]
```

### 