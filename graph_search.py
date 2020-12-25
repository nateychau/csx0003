graph = {
    's': ['a', 'b'],
    'a': ['s', 'c'],
    'b': ['s', 'c', 'd'],
    'c': ['a', 'b', 'd', 'e'],
    'd': ['b', 'c', 'e'],
    'e': ['c', 'd']
}


def bfs_dict(graph, start):
    visited = set()
    visited.add(start)

    to_visit = [start]
    while to_visit:
        node = to_visit.pop(0)
        # print(node)
        neighbors = graph[node]
        for neighbor in neighbors:
            if not neighbor in visited:
                visited.add(neighbor)
                to_visit.append(neighbor)

    return list(visited)

# print(bfs_dict(graph, 's'))


# [s, a, b, c, d, e]
# Each subarray represents a list of indices that correspond to the vertice's edges in adj_edges
adj_vertices = [
    [0, 1],  # s's edges: 0 = s-a, 1 = s-b
    [0, 2],  # a's edges: 0 = s-a, 2 = a-c
    [1, 3, 4],  # b's edges: 1 = s-b, 3 = b-c, 4 = b-d
    [2, 3, 5, 6],  # c's edges: 2 = a-c, 3= b-c, 5=c-d, 6=c-e
    [5, 7],  # d's edges: 5=c-d, 7=d-e
    [6, 7]  # e's edges: 7=d-e
]

# all undirected
# each subarray represents the indices of the start and end vertices in adj_vertices
adj_edges = [
    [0, 1],  # s-a
    [0, 2],  # s-b
    [1, 3],  # a-c
    [2, 3],  # b-c
    [2, 4],  # b-d
    [3, 4],  # c-d
    [3, 5],  # c-e
    [4, 5]  # d-e
]


def get_neighbors(origin, edges):
    output = []
    for edge in edges:
        if edge[0] == origin:
            output.append(edge[1])
        else:
            output.append(edge[0])
    
    return output


def bfs_adj_list(vertices, edges, start):
    visited = set()
    visited.add(start)

    to_visit = [start] #queue holds vertex indices corresponding to a vertex in 'vertices'
    while to_visit:
        node_idx = to_visit.pop(0) #node_idx = a vertex index 
        edge_indices = vertices[node_idx] #edge_indices = list of edges that have an end point at the current node
        node_edges = [edges[i] for i in edge_indices] #list of edges from 'edges' arg that correspond to the edge_indices from above. each of these edges either start or end at current node
        neighbors = get_neighbors(node_idx, node_edges) #get the node index of the 'other' node (the endpoint thats not the current node)
        for neighbor in neighbors: #loop through neighbors like normal bfs
            if not neighbor in visited:
                visited.add(neighbor)
                to_visit.append(neighbor)

    return list(visited)

print(bfs_adj_list(adj_vertices, adj_edges, 0))